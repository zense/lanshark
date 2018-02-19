/* This file exports action creators for creating host related actions.
 * The following action creators are exported:
 *  - requestHosts: Make request to get list of available hosts
 *  - updateHosts: Get list of available hosts.
*/

export function requestHosts() {
  return {
    type: 'REQUEST_HOSTS',
  };
}

export function recieveHosts(hostList) {
  return {
    type: 'RECIEVE_HOSTS',
    hostList,
  };
}
