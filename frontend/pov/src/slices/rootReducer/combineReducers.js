import { combineReducers } from "redux";
import loginReducer from "../login.slice";
import RegisterReducer from "../register.slice"

// Combina los reducers de todos los slices
const rootReducer = combineReducers({
  login: loginReducer,
  register: RegisterReducer,
});

export default rootReducer;