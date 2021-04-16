import { ipcRenderer } from "electron";
import { produce } from "immer";
import { AnyAction } from "redux";
import { AppState } from "../../../types/store";

const INITIAL_STATE: AppState = {
  userDataPath: ipcRenderer.sendSync("getPath", "userData"),
};

export default function (state = INITIAL_STATE, action: AnyAction) {
  return produce(state, () => {
    switch (action.type) {
      default: {
        break;
      }
    }
  });
}
