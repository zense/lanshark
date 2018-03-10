/* This file exports action creators for creating file/media related
 * actions.
 *  -recieveDirectoryListing: Get file listing of a particular
 *  directory
*/

// url is the complete URL of the directory whose listing is provided as the
// 2nd argument i.e. fileList
export function recieveFileList(url, fileList) { // eslint-disable-line
  return {
    type: 'RECIEVE_DIRECTORY_LISTING',
    url,
    fileList,
  };
}
