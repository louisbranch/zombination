var search = require('./search.js');

module.exports = {
  infect: infect,
  treat: treat
};

/* Treat one or multiple [times] diseases on a [city] */
function treat (city, times) {
  times = times || 1;
  if (city.diseases - times < 0) {
    city.diseases = 0;
  } else {
    city.diseases -= times;
  }
}

/*
 * Infect a [city] one or multiple [times]
 * If a city would have more than 3 diseases,
 * an outbreak occurs instead
 */
function infect (city, times, hasOutbreak) {
  var times = times || 1;
  city.diseases = city.diseases || 0;
  if (city.diseases + times > 3) {
    city.diseases = 3;
    outbreak(city, hasOutbreak);
  } else {
    city.diseases += times;
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

/*
 * Run a [callback] function over all connections
 * of a [city]
 */
function eachConnection (city, callback) {
  city.connections.forEach(function (connection) {
    connection = search.city(connection);
    callback(connection);
  });
}
