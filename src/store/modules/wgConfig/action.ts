import * as fs from "fs";
import * as path from "path";
import { ipcRenderer } from "electron";

import { WgConfigTypes, WgConfigFile } from "../../../types/store";

export function fetchFiles(files: WgConfigFile[]) {
  return {
    type: WgConfigTypes.fetchFiles,
    payload: {
      files,
    },
  };
}

export function addFile(file: WgConfigFile) {
  return {
    type: WgConfigTypes.addFile,
    payload: {
      file,
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
