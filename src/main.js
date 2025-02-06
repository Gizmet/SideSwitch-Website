const { app, BrowserWindow, session } = require('electron');
const path = require('path');

// Media permissions and hardware acceleration
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,VaapiVideoEncoder,MediaFoundationVideoCapture');
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Security and compatibility
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('disable-features', 'IsolateOrigins,site-per-process');
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('allow-insecure-localhost');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// Graphics and hardware acceleration settings
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-driver-bug-workarounds');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('force-gpu-rasterization');

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#00000000'
  });

  splashWindow.loadFile(path.join(__dirname, 'splash.html'));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true,
      enableWebSQL: true,
      nativeWindowOpen: true,
      javascript: true,
      webgl: true,
      plugins: true,
      backgroundThrottling: false,
      offscreen: false
    },
    backgroundColor: '#000000',
    show: false,
  });

  // Show window when ready to avoid white flash
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splashWindow.destroy();
      mainWindow.show();
    }, 2700); // Match video duration
  });

  // Load the index.html file from the src directory
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle new windows properly
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('accounts.google.com') || 
        url.includes('oauth') || 
        url.includes('login') ||
        url.includes('auth') ||
        url.includes('signin')) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 800,
          height: 600,
          modal: true,
          parent: mainWindow,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            allowRunningInsecureContent: false,
            partition: 'persist:auth'
          }
        }
      };
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    console.log('Navigation:', navigationUrl);
  });

  return mainWindow;
}

// Application initialization
app.whenReady().then(() => {
  // Set default permissions
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = [
      'media',
      'display-media',
      'mediaKeySystem',
      'geolocation',
      'notifications',
      'fullscreen',
      'clipboard-read',
      'clipboard-write',
      'pointerLock',
      'openExternal',
      'window-placement'
    ];
    callback(allowedPermissions.includes(permission));
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    details.requestHeaders['Accept-Language'] = 'en-US,en;q=0.9';
    details.requestHeaders['Sec-Fetch-Site'] = 'none';
    details.requestHeaders['Sec-Fetch-Mode'] = 'navigate';
    callback({ requestHeaders: details.requestHeaders });
  });

  // Allow all certificate errors
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  });

  createSplashWindow();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}); 