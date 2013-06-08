var app = require('../app.js');
var assert = require('assert');

var city = app.findCity('New York');
assert.deepEqual(city, {name: "New York", color: "blue", connections: ["London", "Madrid", "Montreal", "Washington"]});

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

app.infect(city);
assert.equal(city.drugs, 1);

app.treat(city);
assert.equal(city.drugs, 0);

app.infect(city, 3);
app.treatAll(city);
assert.equal(city.drugs, 0);

app.infect(city, 1);
app.infect(city, 3);
var connections = app.findConnections(city);
assert.deepEqual(connections, [
  { name: 'London',
    color: 'blue',
    connections: [ 'Essen', 'Paris', 'Madrid', 'New York' ],
    drugs: 1
  },
  { name: 'Madrid',
    color: 'blue',
    connections: [ 'Algiers', 'London', 'New York', 'São Paulo', 'Paris' ],
    drugs: 1
  },
  { name: 'Montreal',
    color: 'blue',
    connections: [ 'Chicago', 'New York', 'Washington' ],
    drugs: 1
  },
  { name: 'Washington',
    color: 'blue',
    connections: [ 'Atlanta', 'Miami', 'Montreal', 'New York' ],
    drugs: 1
  }
]);

var outbreak = app.findCity('São Paulo');
var highlyInfected = app.findCity('Buenos Aires');
app.infect(highlyInfected, 3);
app.infect(outbreak, 4);
var connections = app.findConnections(outbreak);
assert.deepEqual(connections, [
  { name: 'Buenos Aires',
    color: 'yellow',
    connections: [ 'Bogotá', 'São Paulo' ],
    drugs: 3 },
  { name: 'Bogotá',
    color: 'yellow',
    connections: [ 'Buenos Aires', 'Lima', 'Mexico City', 'São Paulo' ],
    drugs: 2 },
  { name: 'Lagos',
    color: 'yellow',
    connections: [ 'Khartoum', 'Kinshasa', 'São Paulo' ],
    drugs: 1 },
  { name: 'Madrid',
    color: 'blue',
    connections: [ 'Algiers', 'London', 'New York', 'São Paulo', 'Paris' ],
    drugs: 2 }
]);

