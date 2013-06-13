var search = require('./search.js');

module.exports = {
  containsCity: containsCity,
  eachConnection: eachConnection
};

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

function copyCities (cities) {
  return [].slice.call(cities);
}
