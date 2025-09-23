const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Sites management
  sites: {
    load: () => ipcRenderer.invoke('sites:load'),
    save: (db) => ipcRenderer.invoke('sites:save', db),
    getCategories: () => ipcRenderer.invoke('sites:categories')
  },
  
  // Splash screen communication
  splashDone: () => ipcRenderer.invoke('splash:done')
});
