var _ = require('lodash');
var map = require('../map.json');

module.exports = {
  city: findCity,
  connections: findConnections
};

/* Find a city by [name] and return it */
function findCity (name, cities) {
  cities = cities || map;
  return _.find(cities, function (city) {
    return city.name == name;
  });
}

/*
 * If provided a [callback], run it over all
 * connections of a [city] and return them
 */
function findConnections (city, callback) {
  return _.map(city.connections, function (city) {
    city = findCity(city);
    if (callback) callback(city);
    return city;
  });
}
