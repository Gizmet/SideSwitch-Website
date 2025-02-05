const { app, BrowserWindow, session, ipcMain, dialog } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialize settings store
const store = new Store();

// Performance optimization
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');
app.commandLine.appendSwitch('disable-features', 'UseChromeOSDirectVideoDecoder');
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');

// Additional switches for webview support
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-running-insecure-content');
app.commandLine.appendSwitch('ignore-certificate-errors');

function createWindow() {
  // Load window state
  const windowState = store.get('windowState', {
    width: 1200,
    height: 800,
    x: undefined,
    y: undefined,
    isMaximized: false
  });

  const win = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true,
      permissions: [
        'media',
        'mediaDevices',
        'camera',
        'microphone',
        'notifications'
      ],
      // Performance optimizations
      backgroundThrottling: false,
      enablePreferredSizeMode: true
    },
  });

  // Save window state on close
  function saveWindowState() {
    const bounds = win.getBounds();
    store.set('windowState', {
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      isMaximized: win.isMaximized()
    });
  }

  win.on('close', saveWindowState);
  win.on('resize', () => {
    if (!win.isMaximized()) {
      saveWindowState();
    }
  });
  win.on('move', saveWindowState);

  // Load the index.html file from the src directory
  win.loadFile(path.join(__dirname, 'index.html'));
  
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // Configure session for webview
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    callback({
      requestHeaders: {
        ...details.requestHeaders,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Upgrade-Insecure-Requests': '1'
      }
    });
  });

  // Configure content security policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
          "img-src * 'self' data: blob:;",
          "media-src * 'self' data: blob:;",
          "connect-src * 'self' data: blob:;",
          "frame-src * 'self' data: blob:;"
        ].join(' '),
        'Access-Control-Allow-Origin': ['*'],
        'X-Frame-Options': ['ALLOWALL']
      }
    });
  });

  // Allow all permissions
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  // Allow all certificates
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  });

  return win;
}

// Application initialization
app.whenReady().then(() => {
  // Check for updates if not in development
  if (process.env.NODE_ENV !== 'development') {
    checkForUpdates();
  }

  const mainWindow = createWindow();

  // Enhanced IPC communication
  ipcMain.on('webview-ready', (event) => {
    const webContents = event.sender;
    setupWebviewPermissions(webContents);
  });

  // Handle settings changes
  ipcMain.on('settings-updated', (event, settings) => {
    store.set('settings', settings);
  });

  // Handle errors
  ipcMain.on('error-occurred', (event, error) => {
    console.error('Renderer Error:', error);
    dialog.showErrorBox('Error', error.message);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

function setupWebviewPermissions(webContents) {
  webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = ['media', 'camera', 'microphone'];
    if (allowedPermissions.includes(permission)) {
      const storedPermission = store.get(`webview.permissions.${permission}`);
      callback(storedPermission !== false);
    } else {
      callback(false);
    }
  });
}

// Update checker
async function checkForUpdates() {
  try {
    // Implement your update checking logic here
    console.log('Checking for updates...');
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
}

// Enhanced error handling
app.on('render-process-gone', (event, webContents, details) => {
  console.error('Renderer process crashed:', details);
  dialog.showErrorBox('Error', 'The application has encountered an error and needs to restart.');
  app.relaunch();
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}); 