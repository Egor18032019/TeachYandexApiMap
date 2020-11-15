import {combineReducers} from 'redux';
import {dataReducer} from '../components/data-reducer.js';
// import {usersReducer} from './user/user-reducer';
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.DATA]: dataReducer,
  // [NameSpace.USERS]: usersReducer,
});

