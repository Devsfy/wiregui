export interface WgConfigFile {
  /**
   * Name of the file without extension
   */
  name: string;

  /**
   * Absolute path of file
   */
  path: string;

  /**
   * Addresses of tunnel
   */
  address: string[] | undefined;

  /**
   * Date when tunnel was last connected as ISO String
   */
  lastConnectAt: string | null;

  /**
   * If the tunnel is active,
   * may be unsynced with wireguard if changing via CLI
   */
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
  activeTunnelName: string;
}
