var diseases = require('../../lib/diseases.js');
var search = require('../../lib/search.js');
var assert = require('assert');

describe('Infecting a city', function () {
  it('adds one drug to the city by default', function () {
    var city = search.city('New York');
    diseases.infect(city);
    assert.equal(city.diseases, 1);
  });

  it('adds up to 3 diseases to a city', function () {
    var city = search.city('New York');
    diseases.infect(city, 4);
    assert.equal(city.diseases, 3);
  });
});


describe('Treating a city', function () {
  it('removes one drug from the city by default', function () {
    var city = search.city('New York');
    diseases.treat(city);
    assert.equal(city.diseases, 2);
  });

  it('removes up to 3 diseases from a city', function () {
    var city = search.city('New York');
    diseases.treat(city, 4);
    assert.equal(city.diseases, 0);
  })
});

describe('Triggering an outbreak in a city', function () {
  it('infects all cities connected to the city outbreaking', function () {
    var city = search.city('Lima');
    var connections = search.connections(city);
    diseases.infect(city, 4);
    assert.deepEqual(connections, [
      { name: 'Bogotá',
        color: 'yellow',
        connections: [ 'Buenos Aires', 'Lima', 'Mexico City', 'São Paulo' ],
        diseases: 1 },
      { name: 'Mexico City',
        color: 'yellow',
        connections: [ 'Bogotá', 'Chicago', 'Lima', 'Los Angeles', 'Miami' ],
        diseases: 1 },
      { name: 'Santiago',
        color: 'yellow',
        connections: [ 'Lima' ],
        diseases: 1 }
    ]);
  });
});

describe('Channing outbreaks in connected cities', function () {
  it('does not outbreak the same city twice (infinity loop)', function () {
    var city = search.city('Kolkata');
    var highlyInfected = search.city('Bangkok');
    diseases.infect(highlyInfected, 3);
    diseases.infect(city, 4);
    var connections = search.connections(city);
    assert.deepEqual(connections, [
      { name: 'Bangkok',
        color: 'red',
        connections: [ 'Chennai', 'Ho Chi Mingh City', 'Hong Kong', 'Jakarta', 'Kolkata' ],
        diseases: 3 },
      { name: 'Chennai',
        color: 'black',
        connections: [ 'Bangkok', 'Delhi', 'Jakarta', 'Kolkata', 'Mumbai' ],
        diseases: 2 },
      { name: 'Delhi',
        color: 'black',
        connections: [ 'Chennai', 'Karachi', 'Kolkata', 'Mumbai' ],
        diseases: 1 },
      { name: 'Hong Kong',
        color: 'red',
        connections: [ 'Bangkok', 'Ho Chi Mingh City', 'Kolkata', 'Manila', 'Shangai', 'Taipei' ],
        diseases: 2 }
    ]);
  });
});
