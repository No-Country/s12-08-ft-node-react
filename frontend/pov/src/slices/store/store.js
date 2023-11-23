import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../rootReducer/combineReducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
