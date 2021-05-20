import { app, ipcMain, net } from "electron";
import { version } from "../../../package.json";

ipcMain.on("getPath", (event, arg) => {
  event.returnValue = app.getPath(arg);
});

ipcMain.on("check-for-updates", (event) => {
  const request = net.request("https://api.github.com/repos/devsfy/wiregui/releases/latest");
    request.on("response", (response) => {
      response.on("data", (chunk) => {
        if (response.statusCode !== 200) {
          return;
        }

        const body = JSON.parse(chunk.toString());
        if (body.tag_name !== version) {
          event.reply("update-available");
        }
      });
    });
    request.end();
});
