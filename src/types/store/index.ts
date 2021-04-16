import { WgConfigState } from "./WgConfig";
export * from "./WgConfig";

import { AppState } from "./app";
export * from "./app";

export interface StoreState {
  app: AppState;
  wgConfig: WgConfigState;
}
