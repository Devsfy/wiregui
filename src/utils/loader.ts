import * as fs from "fs";
import * as path from "path";
import { ipcRenderer } from "electron";
import { WgConfig } from "wireguard-tools";

import { WgConfigFile } from "../types/store";

export async function loadWgConfigFiles(): Promise<WgConfigFile[]> {
  const appDataPath = path.join(
    ipcRenderer.sendSync("getPath", "appData"),
    "configurations"
  );
  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath);
  }

  const filenames = fs.readdirSync(appDataPath);
  return Promise.all(
    filenames.map(async (filename: string) => {
      const config = new WgConfig({
        filePath: path.join(appDataPath, filename),
      });
      await config.parseFile();
      return {
        name: filename.split(".")[0],
        address: config.wgInterface.address,
        lastConnectAt: "never",
        active: false,
      };
    })
  );
}
