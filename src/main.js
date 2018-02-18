import {
  app, // module to control application life
  BrowserWindow, // module to create native browser windows
} from 'electron';
import path from 'path';
import url from 'url';
import { startDaemon } from 'utils/lansharkDaemon';

/*
  This is the entry point for the electron main process
*/

// The URL of HTML file served by webpack-dev-server
const DEV_URL = 'http://localhost:1234/';
// URI of HTML file in production
const PROD_URL = url.format({
  pathname: path.join(__dirname, '../public/index.html'),
  protocol: 'file:',
  slashes: true,
});
// In development mode use file served by webpack-dev-server
const LOADURL = (
  process.env.ELECTRON_ENV === 'development'
) ? DEV_URL : PROD_URL;

global.pathToSrc = __dirname;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL(LOADURL);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function startApp() {
  // Start lanshark daemon
  startDaemon();
  // Create new window
  createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startApp);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
