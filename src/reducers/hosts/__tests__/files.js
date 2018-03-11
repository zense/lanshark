import files from 'reducers/hosts/files';
import deepFreeze from 'deep-freeze';

describe('files reducer', () => {
  // The initialState for tests
  const initialState = {
    'http://host1': undefined,
    'http://host2': {
      '/dir1/': {
        type: 'dir',
        size: [0, 1],
      },
      '/dir1/file1': {
        type: 'file',
        size: 100,
      },
    },
    'http://host3': {
      '/dir1/': {
        type: 'dir',
        size: [1, 1],
      },
      '/file1': {
        type: 'file',
        size: 500,
      },
    },
  };

  // Test if reducer mutates state
  deepFreeze(initialState);

  it('should return the intial state', () => {
    expect(files(undefined, {})).toEqual({});
  });

  it('should handle RECIEVE_HOSTS', () => {
    const action = {
      type: 'RECIEVE_HOSTS',
      hostList: [
        ['host2', 'http://host2/'],
        ['host3', 'http://host3/'],
        ['host4', 'http://host4/'],
      ],
    };

    const expected = {
      'http://host4': undefined,
      'http://host2': {
        '/dir1/': {
          type: 'dir',
          size: [0, 1],
        },
        '/dir1/file1': {
          type: 'file',
          size: 100,
        },
      },
      'http://host3': {
        '/dir1/': {
          type: 'dir',
          size: [1, 1],
        },
        '/file1': {
          type: 'file',
          size: 500,
        },
      },
    };

    expect(files(initialState, action)).toEqual(expected);
  });

  it('should update directory', () => {
    const host = 'http://host2';

    const action = {
      type: 'RECIEVE_FILE_LISTING',
      url: `${host}/`,
      fileList: [
        [`${host}/dir1/`, [1, 1], null],
        [`${host}/file1`, 1000, null],
      ],
    };

    // The initialState for tests
    const expected = Object.assign({}, initialState, {
      [host]: Object.assign({}, initialState[host], {
        '/dir1/': {
          type: 'dir',
          size: [1, 1],
        },
        '/file1': {
          type: 'file',
          size: 1000,
        },
      }),
    });

    expect(files(initialState, action)).toEqual(expected);
  });

  it('should add new files to list', () => {
    const host = 'http://host3';

    const action = {
      type: 'RECIEVE_FILE_LISTING',
      url: `${host}/dir1/`,
      fileList: [
        [`${host}/dir1/dir2/`, [0, 2], null],
        [`${host}/dir1/file2`, 500, null],
      ],
    };

    const expected = Object.assign(
      {},
      initialState,
      {
        [host]: Object.assign({}, initialState[host], {
          '/dir1/dir2/': {
            type: 'dir',
            size: [0, 2],
          },
          '/dir1/file2': {
            type: 'file',
            size: 500,
          },
        }),
      },
    );

    expect(files(initialState, action)).toEqual(expected);
  });

  it('should remove non-existent files', () => {
    const host = 'http://host2';

    const action = {
      type: 'RECIEVE_FILE_LISTING',
      url: `${host}/`,
      fileList: [
        [`${host}/dir2/`, [1, 1], null],
      ],
    };

    const expected = Object.assign({}, initialState, {
      [host]: {
        '/dir2/': {
          type: 'dir',
          size: [1, 1],
        },
      },
    });

    expect(files(initialState, action)).toEqual(expected);
  });
});
