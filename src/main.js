const { app, BrowserWindow, session } = require('electron');
const path = require('path');

// Media permissions
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');
app.commandLine.appendSwitch('disable-web-security');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    },
  });

  // Load the index.html file from the src directory
  win.loadFile(path.join(__dirname, 'index.html'));
  
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  return win;
}

// Application initialization
app.whenReady().then(() => {
  // Set up permissions
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  session.fromPartition('persist:streamer').setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  const mainWindow = createWindow();

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