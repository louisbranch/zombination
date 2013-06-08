var app = require('../app.js');
var assert = require('assert');

describe('Finding a city', function () {
  it('returns a city that matches the name given', function () {
    var city = app.findCity('New York');
    assert.deepEqual(city, {
      name: "New York", color: "blue",
      connections: ["London", "Madrid", "Montreal", "Washington"]
    });
  });
});

describe('Finding city conenctions', function () {
  it('returns a list of cities', function () {
    var city = app.findCity('New York');
    var connections = app.findConnections(city);
    assert.deepEqual(connections, [
      { name: 'London',
        color: 'blue',
        connections: [ 'Essen', 'Paris', 'Madrid', 'New York' ] },
      { name: 'Madrid',
        color: 'blue',
        connections: [ 'Algiers', 'London', 'New York', 'São Paulo', 'Paris' ] },
      { name: 'Montreal',
        color: 'blue',
        connections: [ 'Chicago', 'New York', 'Washington' ] },
      { name: 'Washington',
        color: 'blue',
        connections: [ 'Atlanta', 'Miami', 'Montreal', 'New York' ] }
    ]);
  });
});

describe('Infecting a city', function () {
  it('adds one drug to the city by default', function () {
    var city = app.findCity('New York');
    app.infect(city);
    assert.equal(city.drugs, 1);
  });

  it('adds up to 3 drugs to a city', function () {
    var city = app.findCity('New York');
    app.infect(city, 4);
    assert.equal(city.drugs, 3);
  });
});


describe('Treating a city', function () {
  it('removes one drug from the city by default', function () {
    var city = app.findCity('New York');
    app.treat(city);
    assert.equal(city.drugs, 2);
  });

  it('removes up to 3 drugs from a city', function () {
    var city = app.findCity('New York');
    app.treat(city, 4);
    assert.equal(city.drugs, 0);
  })
});

describe('Triggering an outbreak in a city', function () {
  it('infects all cities connected to the city outbreaking', function () {
    var city = app.findCity('Lima');
    var connections = app.findConnections(city);
    app.infect(city, 4);
    assert.deepEqual(connections, [
      { name: 'Bogotá',
        color: 'yellow',
        connections: [ 'Buenos Aires', 'Lima', 'Mexico City', 'São Paulo' ],
        drugs: 1 },
      { name: 'Mexico City',
        color: 'yellow',
        connections: [ 'Bogotá', 'Chicago', 'Lima', 'Los Angeles', 'Miami' ],
        drugs: 1 },
      { name: 'Santiago',
        color: 'yellow',
        connections: [ 'Lima' ],
        drugs: 1 }
    ]);
  });
});

describe('Channing outbreaks in connected cities', function () {
  it('does not outbreak the same city twice (infinity loop)', function () {
    var city = app.findCity('Kolkata');
    var highlyInfected = app.findCity('Bangkok');
    app.infect(highlyInfected, 3);
    app.infect(city, 4);
    var connections = app.findConnections(city);
    assert.deepEqual(connections, [
      { name: 'Bangkok',
        color: 'red',
        connections: [ 'Chennai', 'Ho Chi Mingh City', 'Hong Kong', 'Jakarta', 'Kolkata' ],
        drugs: 3 },
      { name: 'Chennai',
        color: 'black',
        connections: [ 'Bangkok', 'Delhi', 'Jakarta', 'Kolkata', 'Mumbai' ],
        drugs: 2 },
      { name: 'Delhi',
        color: 'black',
        connections: [ 'Chennai', 'Karachi', 'Kolkata', 'Mumbai' ],
        drugs: 1 },
      { name: 'Hong Kong',
        color: 'red',
        connections: [ 'Bangkok', 'Ho Chi Mingh City', 'Kolkata', 'Manila', 'Shangai', 'Taipei' ],
        drugs: 2 }
    ]);
  });
});
