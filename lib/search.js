var map = require('../map.json');

module.exports = {
  city: findCity,
  connections: findConnections
};

function copyMap () {
  return [].slice.call(map);
}

/* Find a city by [name] and return it */
function findCity (name, cities) {
  cities = cities || copyMap();
  for(var i = 0; i < cities.length; i++) {
    if (cities[i].name === name) {
      return cities[i];
    }
  }
}

/* Return all cities connected to a [city] */
function findConnections (city) {
  var cities = [];
  city.connections.forEach(function (connection) {
    cities.push(findCity(connection));
  });
  return cities;
}
