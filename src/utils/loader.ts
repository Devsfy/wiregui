import * as fs from "fs";
import * as path from "path";
import { ipcRenderer } from "electron";
import { WgConfig } from "wireguard-tools";

import { WgConfigFile } from "../types/store";

export async function loadWgConfigFiles(): Promise<WgConfigFile[]> {
  const userDataPath = path.join(
    ipcRenderer.sendSync("getPath", "userData"),
    "configurations"
  );

  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath);
  }

  const filenames = fs.readdirSync(userDataPath);
  return Promise.all(
    filenames.map(async (filename: string) => {
      const config = new WgConfig({
        filePath: path.join(userDataPath, filename),
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
