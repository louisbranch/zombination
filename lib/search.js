var map = require('../map.json');
var utils = require('./utils.js');

module.exports = {
  city: findCity,
  connections: findConnections
};

/* Find a city by [name] and return it */
function findCity (name, cities) {
  cities = cities || utils.copy(map);
  for(var i = 0; i < cities.length; i++) {
    if (cities[i].name === name) {
      return cities[i];
    }
  }
}

/*
 * Run a [callback] function over all connections
 * of a [city] and return the connections
 */
function findConnections (city, callback) {
  var cities = [];
  city.connections.forEach(function (connection) {
    connection = findCity(connection);
    cities.push(connection);
    if (callback) {
      callback(connection);
    }
  });
  return cities;
}
