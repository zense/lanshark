// Mock the discover function
export const discover = jest.fn();  // eslint-disable-line
discover
  .mockReturnValue(Promise.resolve([ // Normal return value of discover
    ['hosts1', 'urlHost1'],
    ['hosts2', 'urlHost2'],
    ['hosts3', 'urlHost3'],
  ]));
