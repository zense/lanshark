/* This file exports action creators for creating file/media related
 * actions.
 *  - recieveFileListing: Get file listing of a particular
 *  directory
 *  - requestFileList: Request file listing of a particular directory
*/

// url is the complete URL of the directory whose listing is provided as the
// 2nd argument i.e. fileList
export function recieveFileList(url, fileList) {
  return {
    type: 'RECIEVE_FILE_LISTING',
    url,
    fileList,
  };
}

// url is the complete url of the directory whose listing is being requested
export function requestFileList(url) {
  return {
    type: 'REQUEST_FILE_LISTING',
    url,
  };
}
