export interface WgConfigFile {
  name: string;
  path: string;
  address: string[] | undefined;
  lastConnectAt: string;
  active: boolean;
}

export enum WgConfigTypes {
  fetchFiles = "FETCH_FILES",
  addFile = "ADD_FILE",
  deleteFile = "DELETE_FILE",
}

export interface WgConfigState {
  files: WgConfigFile[];
}
