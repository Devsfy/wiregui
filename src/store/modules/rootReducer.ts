import { combineReducers } from "redux";

import app from "./app/reducer";
import wgConfig from "./wgConfig/reducer";

export default combineReducers({ app, wgConfig });
