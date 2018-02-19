import hostList from 'reducers/hosts/hostList';
import deepFreeze from 'deep-freeze';

describe('hostList reducer', () => {
  it('should return the initial state', () => {
    expect(hostList(undefined, {})).toEqual([]);
  });

  it('should handle RECIEVE_HOSTS', () => {
    const initialState = [
      ['host1', 'urlHost1'],
      ['host2', 'urlHost2'],
    ];

    // Test if reducer mutates state
    deepFreeze(initialState);

    const action = {
      type: 'RECIEVE_HOSTS',
      hostList: [
        ['host3', 'urlHost3'],
        ['host4', 'urlHost4'],
        ['host5', 'urlHost5'],
      ],
    };

    // New list should contain hosts from action only
    const expected = [...action.hostList];

    expect(hostList(initialState, action)).toEqual(expected);
  });
});
