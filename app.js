var map = require('./map.json');

module.exports = {
  findCity: findCity,
  findConnections: findConnections,
  infect: infect,
  treat: treat,
  treatAll: treatAll
};

/* Find a city by [name] and return it */
function findCity (name, cities) {
  for(var i = 0; i < map.length; i++) {
    if (map[i].name === name) {
      return map[i];
    }
  }
}

/*
 * Run a [callback] function over all connections
 * of a given [city]
 */
function eachConnection (city, callback) {
  city.connections.forEach(function (connection) {
    connection = findCity(connection);
    callback(connection);
  });
}

/* Return all cities connected to a given [city] */
function findConnections (city) {
  var cities = [];
  city.connections.forEach(function (connection) {
    cities.push(findCity(connection));
  });
  return cities;
}

function treat (city, times) {
  times = times || 1;
  city.drugs = city.drugs - times;
}

function treatAll (city) {
  city.drugs = 0;
}

function infect (city, times, hasOutbreak) {
  var times = times || 1;
  city.drugs = city.drugs || 0;
  hasOutbreak = hasOutbreak || [];

  if (city.drugs + times > 3) {
    city.drugs = 3;
    hasOutbreak.push(city);
    outbreak(city, hasOutbreak);
  } else {
    city.drugs += times;
  }
}

function outbreak (city, hasOutbreak) {
  eachConnection(city, function (connection) {
    if (!containsCity(connection, hasOutbreak)) {
      infect(connection, 1, hasOutbreak);
    }
  });
}

function containsCity (city, list) {
  for (var i = 0; i < list.length; i++) {
    if (city === list[i]) {
      return true;
    }
  }
}
