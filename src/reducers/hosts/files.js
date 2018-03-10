/* This file exports the reducer which handles the state related to the
 * file listing of the available hosts. */

import { URL } from 'url';

// Update the state with the newFileList at the path determined by url
function getUpdatedFileList(state, url, newFileList) {
  // The path of the parent directory whose file list is newFileList
  const { pathname: parentPath } = new URL(url);

  // The children of parentPath obtained from newFileList
  const newChildren = newFileList.map(item => (new URL(item[0]).pathname));

  // The state corresponding only to newChildren
  const childrenList = newFileList.reduce((acc, item, index) => {
    acc[newChildren[index]] = {
      type: (item[0].slice(-1) === '/') ? 'dir' : 'file',
      size: item[1],
    };

    return acc;
  }, {});

  // If state is undefined, then no need of updates
  if (!state) return childrenList;

  // The regex object to test for path names that are the direct children of
  // parentPath
  const re = new RegExp(`^${parentPath}([^/]+)/?$`);

  const [nonChildren, oldChildren] = Object.keys(state).reduce(([nc, oc], path) => {
    if (re.test(path)) {
      oc.push(path);
    } else {
      nc.push(path);
    }

    return [nc, oc];
  }, [[], []]);

  // Get list of removed children
  const removedChildren = oldChildren.filter(path => (
    newChildren.indexOf(path) === -1
  ));

  // List of keys that need not be updated
  const noUpdate = removedChildren.reduce((arr, rootPath) => (
    arr.filter(path => (!path.startsWith(rootPath)))
  ), nonChildren);

  const noUpdateList = noUpdate.reduce((acc, path) => {
    acc[path] = state[path];
    return acc;
  }, {});

  return Object.assign({}, noUpdateList, childrenList);
}

// Reducer that handles actions related to directory listing of hosts
// The state is an object that contains a mapping between the host (IP:Port,
// e.g. "http://127.0.0.1:3000") and the SHARED directory listing of the host.
//
// Structure of the directory listing:
//  {
//      '/dir1/': {
//          type: 'dir',
//          size: [num_subfolders, num_files]
//      },
//      '/file1': {
//          type: 'file',
//          size: size_of_file
//      },
//      '/dir1/file2': {
//          type: 'file',
//          size: size_of_file
//      }
//  }
//  Thus the data is normalized for easy and fast updates
function files(state = {}, action) {
  switch (action.type) {
    case 'RECIEVE_HOSTS': {
      return action.hostList
        // Get array of hosts (the IP and port number of host)
        .map(host => ((new URL(host[1])).origin))
        .reduce((acc, host) => {
          // Assign previous directory listing if host was already present
          // Else assign undefined
          acc[host] = state[host];
          return acc;
        }, {});
    }

    case 'RECIEVE_DIRECTORY_LISTING': {
      const { origin: host } = new URL(action.url);

      return Object.assign({}, state, {
        [host]: getUpdatedFileList(state[host], action.url, action.fileList),
      });
    }

    default:
      return state;
  }
}

export default files;
