import runPythonScript from 'utils/pythonScript';
import * as log from 'loglevel';
import * as resources from 'utils/resources';

/*
  This file contains functions to call the lanshark python programs.

  The following named exports are made:
    - discover: Returns list of available hosts
    - ls: Returns listing of directory
    - search: Search for file or directory across available hosts
*/

/*
  Lists available hosts.

  Return Value:
      A Promise that is resovled to the list of available hosts. Each value in
      the array is a tuple of the form: (host_name, URL_of_Root)

      In case of error the error is logged and the promise is resolved to an
      empty error.
*/
export function discover() {
  return runPythonScript([
    resources.lansharkc,
    'discover',
  ]).then((hosts) => {
    log.info('lansharkInterface.js/discover: Recieved available hosts list');
    log.debug(hosts);

    return JSON.parse(hosts);
  }).catch((err) => {
    log.error(
      'An error occured in lansharkInterface.js/discover: ',
      err,
    );

    // Return a valid result to prevent errors in calling functions
    return [];
  });
}

/*
  Lists the contents of a directory

  Arguments:
      The url whose listing is to be retrieved. URL should be a directory
      (i.e. it should end with a '/')

  Return Value:
      A Promise that is resolved to an Array of the contents of the directory.
      Each value is a tuple of the form: (name, size, icon)

      Size is a tuple in case name is a directory of the form:
      (num_subfolders, num_files)

      In case of error the error is logged and the promise is resolved to an
      empty array.
*/
export function ls(url) {
  return runPythonScript([
    resources.lansharkc,
    'ls',
    url,
  ]).then((listing) => {
    log.info('lansharkInterface.js/ls: Recieved listing of ', url);
    log.debug(listing);

    // Convert to JS Array
    return JSON.parse(listing);
  }).catch((err) => {
    // Catch and log any errors
    log.error(
      'lansharkInterface.js/ls: ',
      err,
    );

    // Return a valid result to prevent errors in calling functions
    return [];
  });
}

/*
  Lists the matches of a search across all hosts

  Arguments:
    The searchString which is matched with file names.

  Return Value:
    A Promise that is resolved to an Array of matched URLs.

    In case of error the error is logged and the promise is resolved to an
    empty array.
*/
export function search(searchString) {
  return runPythonScript([
    resources.lansharkc,
    'search',
    searchString,
  ]).then((matches) => {
    log.info('lanshark/Interface.jsRecieved matches for search: ', searchString);
    log.debug(matches);

    return JSON.parse(matches);
  }).catch((err) => {
    log.error(
      'An error occurred in lansharkInterface.js/search: ',
      err,
    );

    // Return a valid result to prevent errors in calling functions
    return [];
  });
}
