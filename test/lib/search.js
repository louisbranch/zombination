var search = require('../../lib/search.js');
var assert = require('assert');
var sinon = require('sinon');

describe('search.city', function () {
  var city = search.city('Moscow');
  it('returns a city that matches the name given', function () {
    assert.deepEqual(city, {
      name: "Moscow", color: "black",
      connections: [ 'Istanbul', 'St. Petersburg', 'Tehran' ]
    });
  });
});

describe('search.connections', function () {
  it('returns a list of connected cities', function () {
    var city = search.city('Moscow');
    var connections = search.connections(city);
    assert.deepEqual(connections, [
      { name: 'Istanbul',
        color: 'black',
        connections: [ 'Algiers', 'Baghdad', 'Cairo', 'Milan', 'Moscow' ] },
      { name: 'St. Petersburg',
        color: 'blue',
        connections: [ 'Essen', 'Istanbul', 'Moscow' ] },
      { name: 'Tehran',
        color: 'black',
        connections: [ 'Baghdad', 'Delhi', 'Karachi', 'Moscow' ] }
    ]);
  });

  it('runs an optional callback over all connected cities', function () {
    var callback = sinon.spy();
    var city = search.city('Moscow');
    var connections = search.connections(city, callback);
    assert.equal(callback.callCount, 3);
  });
});
