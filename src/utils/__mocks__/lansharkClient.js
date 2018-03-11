// Mock the discover function
export const discover = jest.fn();
discover
  .mockReturnValue(Promise.resolve([ // Normal return value of discover
    ['hosts1', 'urlHost1'],
    ['hosts2', 'urlHost2'],
    ['hosts3', 'urlHost3'],
  ]));

// Mock of ls function
// A list containing 2 files and 2 directories is returned
export const ls = jest.fn(url => (Promise.resolve([
  [`${url}file1`, 500, null],
  [`${url}file2`, 500, null],
  [`${url}dir1/`, [2, 2], null],
  [`${url}dir2/`, [2, 2], null],
])));
