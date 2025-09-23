const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  splashDone: () => ipcRenderer.invoke('splash:done')
});
