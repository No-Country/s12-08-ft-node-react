import { combineReducers } from 'redux';
import loginReducer from '../login.slice';
import RegisterReducer from '../register.slice';
//import ChastSlice from '../chast.slice';
import profileSlice from '../profileSlice';

import subscriptionsReducer from "../subscriptionsSlice";

// Combina los reducers de todos los slices
const rootReducer = combineReducers({
  login: loginReducer,
  register: RegisterReducer,
  profile: profileSlice,
  //chat: ChastSlice,
  subscriptions: subscriptionsReducer
});

export default rootReducer