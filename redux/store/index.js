import { createStore } from "redux";
import { reducer } from "../reducer/index.js";
import { devToolsEnhancer } from "redux-devtools-extension";

export const store = createStore(reducer, devToolsEnhancer());
