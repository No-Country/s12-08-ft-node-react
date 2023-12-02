import { combineReducers } from 'redux';
import loginReducer from '../login.slice';
import RegisterReducer from '../register.slice';
// import subscriptionsReducer from "../subscriptionsSlice";

// Combina los reducers de todos los slices
const rootReducer = combineReducers({
  login: loginReducer,
  register: RegisterReducer,
  //subscriptions: subscriptionsReducer,
});

export default rootReducer;
