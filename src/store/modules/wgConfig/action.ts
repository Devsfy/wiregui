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
