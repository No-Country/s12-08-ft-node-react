import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer/combineReducers.js";


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: import.meta.env.PROD !== "production",
});

export default store;
