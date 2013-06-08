var map = require('./map.json');

module.exports = {
  findCity: findCity,
  findConnections: findConnections,
  infect: infect,
  treat: treat
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
 * of a [city]
 */
function eachConnection (city, callback) {
  city.connections.forEach(function (connection) {
    connection = findCity(connection);
    callback(connection);
  });
}

/* Return all cities connected to a [city] */
function findConnections (city) {
  var cities = [];
  city.connections.forEach(function (connection) {
    cities.push(findCity(connection));
  });
  return cities;
}

/* Treat one or multiple [times] drugs on a [city] */
function treat (city, times) {
  times = times || 1;
  if (city.drugs - times < 0) {
    city.drugs = 0;
  } else {
    city.drugs -= times;
  }
}

/*
 * Infect a [city] one or multiple [times]
 * If a city would have more than 3 drugs,
 * an outbreak occurs instead
 */
function infect (city, times, hasOutbreak) {
  var times = times || 1;
  city.drugs = city.drugs || 0;
  if (city.drugs + times > 3) {
    city.drugs = 3;
    outbreak(city, hasOutbreak);
  } else {
    city.drugs += times;
  }
}

/*
 * Add [city] to [hasOutbreak] list
 * Infect all connected cities, cities
 * which have an outbreak already don't
 * have an outbreak twice
 */
function outbreak (city, hasOutbreak) {
  hasOutbreak = hasOutbreak || [];
  hasOutbreak.push(city);

  eachConnection(city, function (connection) {
    if (!containsCity(connection, hasOutbreak)) {
      infect(connection, 1, hasOutbreak);
    }
  });
}

/* Test if a [city] is in the [list] */
function containsCity (city, list) {
  for (var i = 0; i < list.length; i++) {
    if (city === list[i]) {
      return true;
    }
  }
}
