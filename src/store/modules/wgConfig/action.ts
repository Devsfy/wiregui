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
        const filePath = path.join(userDataPath, filename);
        const config = new WgConfig({ filePath });
        await config.parseFile();

        const name = filename.split(".")[0];
        const lastConnectAt = localStorage.getItem(name);
        return {
          name,
          path: filePath,
          address: config.wgInterface.address,
          lastConnectAt,
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
  const config = new WgConfig({});
  config.parse(data);

  const filePath = path.join(
    ipcRenderer.sendSync("getPath", "userData"),
    "configurations",
    name,
  );
  fs.writeFileSync(filePath, data);

  const lastConnectAt = localStorage.getItem(name);
  const wgConfigFile: WgConfigFile = {
    name: name.split(".")[0],
    path: filePath,
    address: config.wgInterface.address,
    lastConnectAt,
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

export function updateStatus(currentConnectionName: string) {
  return {
    type: WgConfigTypes.updateStatus,
    payload: {
      currentConnectionName,
    },
  };
}
