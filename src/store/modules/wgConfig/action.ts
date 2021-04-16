import * as fs from "fs";
import * as path from "path";
import { Dispatch } from "react";
import { ipcRenderer } from "electron";
import { WgConfig } from "wireguard-tools";

import { WgConfigTypes, WgConfigFile } from "../../../types/store";
import { getCurrentConnectionName } from "../../../utils";

export function fetchFiles() {
  return async function(dispatch: Dispatch<unknown>) {
    const userDataPath = path.join(
      ipcRenderer.sendSync("getPath", "userData"),
      "configurations"
    );
  
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath);
    }
  
    const curConName = await getCurrentConnectionName();
    const filenames = fs.readdirSync(userDataPath);
    const files = await Promise.all(
      filenames.map(async (filename: string) => {
        const config = new WgConfig({ filePath: path.join(userDataPath, filename) });
        await config.parseFile();

        const name = filename.split(".")[0];
        return {
          name,
          address: config.wgInterface.address,
          lastConnectAt: "never",
          active: name === curConName,
        };
      })
    );

    dispatch(fetchFilesSuccess(files));
  }
}

export function fetchFilesSuccess(files: WgConfigFile[]) {
  return {
    type: WgConfigTypes.fetchFiles,
    payload: {
      files,
    },
  };
}

export function addFile(name: string, data: string) {
  const filePath = path.join(
    ipcRenderer.sendSync("getPath", "userData"),
    "configurations",
    name,
  );
  fs.writeFileSync(filePath, data);

  const config = new WgConfig({});
  config.parse(data);

  const wgConfigFile: WgConfigFile = {
    name: name.split(".")[0],
    address: config.wgInterface.address,
    lastConnectAt: "never",
    active: false,
  };

  return {
    type: WgConfigTypes.addFile,
    payload: {
      file: wgConfigFile,
    },
  };
}

export function deleteFile(file: WgConfigFile) {
  const filePath = path.join(
    ipcRenderer.sendSync("getPath", "userData"),
    "configurations",
    `${file.name}.conf`,
  );

  fs.unlinkSync(filePath);

  return {
    type: WgConfigTypes.deleteFile,
    payload: {
      filename: file.name,
    },
  };
}
