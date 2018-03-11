import { recieveFileList, requestFileList } from 'actions/files';

// Tests for recieveDirectoryListing
describe('recieveFileList action creator', () => {
  // Test return value
  it('should create an action to recieve a file listing', () => {
    // The URL for which the directory listing is obtained. Sent as argument to
    // recieveDirectoryListing
    const url = 'http://127.0.0.1:31337/dir1/';

    // The response of the lansharkClient ls function sent as argument
    const fileList = [
      [`${url}file1.txt`, 944, null],
      [`${url}dir2/`, [0, 0], null],
    ];


    const expected = {
      type: 'RECIEVE_FILE_LISTING',
      url,
      fileList,
    };

    expect(recieveFileList(url, fileList)).toEqual(expected);
  });
});

// Tests for requestFileList
describe('requestFileList action creator', () => {
  // Test return value
  it('should create an action to request a file listing', () => {
    // The URL for which the directory listing is obtained. Sent as argument to
    // requestFileList
    const url = 'http://127.0.0.1:31337/dir1/';

    const expected = {
      type: 'REQUEST_FILE_LISTING',
      url,
    };

    expect(requestFileList(url)).toEqual(expected);
  });
});
