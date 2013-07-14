var _ = require('lodash');

module.exports = {
  fly: fly,
  initialPosition: initialPosition,
  walk: walk
};

/*
 * Emits a fly event to all players
 * with the starting city as destination
 */
function initialPosition(game) {
  var city = findStartCity(game.map);
  _.each(game.players, function (player) {
    game.e('cities:fly', player, city);
  });
}

/*
 * Fly a player to any destination, regardless
 * of the origin city
 */
function fly(player, city, game) {
  city = findCity(city, game);
  move(player, city, game);
}

/* Move between two connected cities */
function walk(player, city, game) {
  var origin = findOrigin(player);
  city = findConnection(origin, city, game);
  move(player, city, game);
  game.e('cities:walk:end');
}

/*
 * Set new player position and
 * emites enterCity event
 */
function move(player, city, game) {
  player.position = city;
  game.e('cities:enter:end', player, city);
}

/*
 * Finds a city that has a start attribute
 * or throws an error
 */
function findStartCity(map) {
  var city =  _.findKey(map, function (city, name) {
    return city.start;
  });
  if (city) return city;
  else throw new Error('Starting city not found');
}

/* Finds a city on a map or throws an error */
function findCity(city, game) {
  if (game.map[city]) return city;
  else throw new Error(city + ' not found');
}

/* Finds a connected city or throws an error */
function findConnection(origin, destination, game) {
  origin = game.map[origin];
  var city = game.map[destination];
  if (_.contains(origin.connections, city)) {
    return destination;
  } else {
    throw new Error(origin + 'is not connected to ' + destination);
  }
}

/* Finds the player position or throws an error */
function findOrigin(player) {
  var origin = player.position;
  if (origin) return origin;
  else throw new Error(player + ' position not found');
}

