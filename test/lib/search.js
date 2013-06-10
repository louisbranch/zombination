var search = require('../../lib/search.js');
var assert = require('assert');

describe('Finding a city', function () {
  it('returns a city that matches the name given', function () {
    var city = search.city('Moscow');
    assert.deepEqual(city, {
      name: "Moscow", color: "black",
      connections: [ 'Istanbul', 'St. Petersburg', 'Tehran' ]
    });
  });
});

describe('Finding city connections', function () {
  it('returns a list of cities', function () {
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
});


