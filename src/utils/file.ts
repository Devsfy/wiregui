import * as fs from "fs";
import * as path from "path";
import { ipcRenderer } from "electron";
import { WgConfig } from "wireguard-tools";
import { WgConfigFile } from "../types/store";

export interface ConfFile {
  name: string;
  path: string;
  data: string;
}

export async function saveFile(
  name: string,
  data: string
): Promise<WgConfigFile> {
  const appDataPath = path.join(
    ipcRenderer.sendSync("getPath", "appData"),
    "configurations",
    name
  );
  fs.writeFileSync(appDataPath, data);

  const config = new WgConfig({ filePath: appDataPath });
  await config.parseFile();
  return {
    name: name,
    active: false,
    address: config.wgInterface.address,
    lastConnectAt: "never",
  };
}

export async function readFile(name: string, path: string): Promise<ConfFile> {
  const data = fs.readFileSync(path, "utf-8");

  return {
    name,
    path,
    data,
  };
}
