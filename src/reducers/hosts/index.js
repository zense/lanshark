/*
  This file exports the reducer which handles the state related to hosts and
  file lists of individual hosts.
*/

import { combineReducers } from 'redux';
import hostList from 'reducers/hosts/hostList';

export default combineReducers({
  hostList,
});
