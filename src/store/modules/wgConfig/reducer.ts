import { Reducer } from "redux";
import { produce } from "immer";

import { WgConfigTypes, WgConfigState } from "../../../types/store";

const INITIAL_STATE: WgConfigState = {
  files: [],
};

const wgConfig: Reducer<WgConfigState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case WgConfigTypes.fetchFiles: {
        const { files } = action.payload;
        draft.files = files;
        break;
      }

      case WgConfigTypes.addFile: {
        const { file } = action.payload;
        draft.files.push(file);
        break;
      }

      case WgConfigTypes.deleteFile: {
        const { filename } = action.payload;
        draft.files = draft.files.filter(file => file.name === filename);
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default wgConfig;
