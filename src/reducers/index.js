/*
  This file exports the reducer to be used with the store (root reducer).
*/

import { combineReducers } from 'redux';
import hosts from 'reducers/hosts/index';

export default combineReducers({
  hosts,
});
