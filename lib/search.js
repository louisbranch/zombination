var map = require('../map.json');

module.exports = {
  city: findCity,
  connections: findConnections
};

/* Find a city by [name] and return it */
function findCity (name, cities) {
  cities = cities || map;
  for(var i = 0; i < map.length; i++) {
    if (map[i].name === name) {
      return map[i];
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
