/*
  This file exports the reducer that handles state related to list of hosts.
*/

// Reducer that handles actions that affect the list of available hosts
function hostList(state = [], action) {
  switch (action.type) {
    case 'RECIEVE_HOSTS':
      // Return new array of available hosts
      return [...action.hostList];

    default:
      return state;
  }
}

export default hostList;
