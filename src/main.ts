import { app, autoUpdater, BrowserWindow, dialog, Menu } from "electron";
import { TrayMenu } from "./main/TrayMenu";
import { MenuBar } from "./main/MenuBar";
import { getIconsPath } from "./utils";
import "./ipc/main";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Invoke the updater.
require("update-electron-app")();// eslint-disable-line @typescript-eslint/no-var-requires

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}

const isDevelopement = (process.env.NODE_ENV !== "production");

const createWindow = (): void => {
  // Enforce single instance.
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
    return;
  }

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
    icon: getIconsPath("icon.png", isDevelopement),
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDevelopement) {
    // Open the DevTools if in development mode.
    mainWindow.webContents.openDevTools();
  }

  // Create custom menus
  const trayMenu = new TrayMenu(mainWindow, isDevelopement);
  const menuBar = new MenuBar(trayMenu);
  const template = menuBar.generateTemplate();

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
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

// Bring the window to front on spawning new instance.
app.on("second-instance", (event, commandLine, workingDirectory) => {
  const mainWindow = BrowserWindow.getAllWindows()[0];
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.show();
  }
});

// Notify the user when there's a new update
autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Update", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail: "A new version has been downloaded. Restart the application to apply the updates."
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
