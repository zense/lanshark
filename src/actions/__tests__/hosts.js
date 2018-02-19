import {
  recieveHosts,
  requestHosts,
} from 'actions/hosts';

// Tests for requestHosts
describe('requestHosts action creator', () => {
  // Test return value
  it('should create an action to request hosts', () => {
    const expected = {
      type: 'REQUEST_HOSTS',
    };

    expect(requestHosts()).toEqual(expected);
  });
});

// Tests for recieveHosts
describe('recieveHosts action creator', () => {
  // Test return value on passing arbitrary response
  it('should create an action to recieve hosts', () => {
    // The response list sent as argument to recieveHosts
    const response = [
      ['hosts1', 'urlHost1'],
      ['hosts2', 'urlHost2'],
      ['hosts3', 'urlHost3'],
    ];

    const expected = {
      type: 'RECIEVE_HOSTS',
      hostList: response,
    };

    expect(recieveHosts(response)).toEqual(expected);
  });
});
