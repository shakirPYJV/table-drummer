// Table Drummer v1.4 — desktop app (Windows, macOS, Linux). Created by Shakir.
const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 400, minHeight: 600,
    backgroundColor: '#0b0720', title: 'Table Drummer', autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'www', 'icons', 'icon-512.png'),
    webPreferences: { contextIsolation: true, sandbox: true },
  });
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  // open any external link in the normal browser, not inside the game
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // F11 toggles full screen
  win.webContents.on('before-input-event', (e, input) => {
    if(input.type === 'keyDown' && input.key === 'F11'){ win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
}

app.whenReady().then(() => {
  // the game needs the microphone (it is the controller) and may go full screen
  session.defaultSession.setPermissionRequestHandler((wc, permission, callback) => callback(permission === 'media' || permission === 'fullscreen'));
  session.defaultSession.setPermissionCheckHandler((wc, permission) => permission === 'media' || permission === 'fullscreen');
  createWindow();
  app.on('activate', () => { if(BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if(process.platform !== 'darwin') app.quit(); });
