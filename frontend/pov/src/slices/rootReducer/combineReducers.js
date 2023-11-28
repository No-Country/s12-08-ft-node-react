import { combineReducers } from "redux";
import loginReducer from "../login.slice";

// Combina los reducers de todos los slices
const rootReducer = combineReducers({
  login: loginReducer,  
});

export default rootReducer;