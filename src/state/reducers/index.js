
import { combineReducers } from 'redux';
import { savedCityReducer as cityReducer } from './searched-cities-reducers.js';
import { userReducer } from './userReducer';

export default combineReducers({
  cityReducer,
  userReducer,
});

