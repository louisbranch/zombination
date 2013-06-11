var zombies = require('../../lib/zombies.js');
var search = require('../../lib/search.js');
var assert = require('assert');

describe('Infecting a city', function () {
  it('adds one zombie to the city by default', function () {
    var city = search.city('New York');
    zombies.infect(city);
    assert.equal(city.zombies, 1);
  });

  it('adds up to 3 zombies to a city', function () {
    var city = search.city('New York');
    zombies.infect(city, 4);
    assert.equal(city.zombies, 3);
  });
});


describe('Treating a city', function () {
  it('removes one zombie from the city by default', function () {
    var city = search.city('New York');
    zombies.kill(city);
    assert.equal(city.zombies, 2);
  });

  it('removes up to 3 zombies from a city', function () {
    var city = search.city('New York');
    zombies.kill(city, 4);
    assert.equal(city.zombies, 0);
  })
});

describe('Triggering an outbreak in a city', function () {
  it('Infect all cities connected to the city outbreaking', function () {
    var city = search.city('Lima');
    var connections = search.connections(city);
    zombies.infect(city, 4);
    assert.deepEqual(connections, [
      { name: 'Bogotá',
        color: 'yellow',
        connections: [ 'Buenos Aires', 'Lima', 'Mexico City', 'São Paulo' ],
        zombies: 1 },
      { name: 'Mexico City',
        color: 'yellow',
        connections: [ 'Bogotá', 'Chicago', 'Lima', 'Los Angeles', 'Miami' ],
        zombies: 1 },
      { name: 'Santiago',
        color: 'yellow',
        connections: [ 'Lima' ],
        zombies: 1 }
    ]);
  });
});

describe('Channing outbreaks in connected cities', function () {
  it('does not outbreak the same city twice (infinity loop)', function () {
    var city = search.city('Kolkata');
    var crowded = search.city('Bangkok');
    zombies.infect(crowded, 3);
    zombies.infect(city, 4);
    var connections = search.connections(city);
    assert.deepEqual(connections, [
      { name: 'Bangkok',
        color: 'red',
        connections: [ 'Chennai', 'Ho Chi Mingh City', 'Hong Kong', 'Jakarta', 'Kolkata' ],
        zombies: 3 },
      { name: 'Chennai',
        color: 'black',
        connections: [ 'Bangkok', 'Delhi', 'Jakarta', 'Kolkata', 'Mumbai' ],
        zombies: 2 },
      { name: 'Delhi',
        color: 'black',
        connections: [ 'Chennai', 'Karachi', 'Kolkata', 'Mumbai' ],
        zombies: 1 },
      { name: 'Hong Kong',
        color: 'red',
        connections: [ 'Bangkok', 'Ho Chi Mingh City', 'Kolkata', 'Manila', 'Shangai', 'Taipei' ],
        zombies: 2 }
    ]);
  });
});
