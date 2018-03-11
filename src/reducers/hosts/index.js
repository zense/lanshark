/*
  This file exports the reducer which handles the state related to hosts and
  file lists of individual hosts.
*/

import { combineReducers } from 'redux';
import hostList from 'reducers/hosts/hostList';
import files from 'reducers/hosts/files';

export default combineReducers({
  hostList,
  files,
});
