/* This file exports action creators.
 * The following action creators are exported:
 *  - updateHosts: Update list of discoverable hosts
*/

import { recieveHosts, requestHosts } from 'actions/hosts';
import { requestFileList, recieveFileList } from 'actions/files';
import { discover, ls } from 'utils/lansharkClient';

export function updateHosts() {
  // Return thunk
  return async (dispatch) => {
    try {
      // Dispatch REQUEST_HOSTS action
      dispatch(requestHosts());

      // Make the request
      const hostList = await discover();

      // Dispatch RECIEVE_HOSTS action
      dispatch(recieveHosts(hostList));
    } catch (err) {
      // Ignore errors
    }
  };
}

export function updateFileList(url) {
  // Return thunk
  return async (dispatch) => {
    try {
      // Dispatch REQUEST_FILE_LISTING action
      dispatch(requestFileList(url));

      // Make the request
      const fileList = await ls(url);

      // Dispatch RECIEVE_FILE_LISTING action
      dispatch(recieveFileList(url, fileList));
    } catch (err) {
      // Ignore errors
    }
  };
}
