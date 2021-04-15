import { app, ipcMain } from "electron";

ipcMain.on("getPath", (event, arg) => {
  event.returnValue = app.getPath(arg);
});
