/* This file exports action creators.
 * The following action creators are exported:
 *  - updateHosts: Update list of discoverable hosts
*/

import {
  recieveHosts,
  requestHosts,
} from 'actions/hosts';
import { discover } from 'utils/lansharkClient';

export function updateHosts() { //eslint-disable-line
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
