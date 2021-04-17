import { app, BrowserWindow } from "electron";
import * as path from "path";
import "./ipc";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}

const isDevelopement = (process.env.NODE_ENV !== "production");

// Get app icon from assets folder
function getIcon() {
  if (isDevelopement) {
    return path.resolve(path.join(__dirname, "..", "..", "src", "assets", "icons", "icon.png"));
  }
  return path.resolve(path.join(__dirname, "..", "renderer", "icons", "icon.png"));
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 850,
    width: 1200,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    icon: getIcon(),
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDevelopement) {
    // Open the DevTools if in development mode.
    mainWindow.webContents.openDevTools();
  } else {
    // Remove menu from production build.
    mainWindow.removeMenu();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
