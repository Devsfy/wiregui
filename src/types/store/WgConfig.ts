export interface WgConfigFile {
  name: string;
  path: string;
  address: string[] | undefined;
  lastConnectAt: string | null;
  active: boolean;
}

export enum WgConfigTypes {
  fetchFiles = "FETCH_FILES",
  addFile = "ADD_FILE",
  deleteFile = "DELETE_FILE",
  updateStatus = "UPDATE_STATUS",
}

export interface WgConfigState {
  files: WgConfigFile[];
  currentConnectionName: string;
}
