import {createStore} from "redux";
import reducer from "./reducer";
import initialState from "./initialState.js"

module.exports = createStore(reducer, initialState,
  window.devToolsExtension && window.devToolsExtension()
);