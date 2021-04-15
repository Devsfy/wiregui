import { createStore } from "redux";

import reducers from "./modules/rootReducer";

const store = createStore(reducers);

export default store;
