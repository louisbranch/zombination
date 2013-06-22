var _ = require('lodash');

module.exports = {
  fly: fly,
  walk: walk,
  startPosition: startPosition
};

/*
 * Emits a fly event to all players
 * with the starting city as destination
 */
function startPosition (game) {
  var city = findStartCity(game.map);
  if (city) {
    _.each(game.players, function (player) {
      game.e('fly', player, city);
    });
  } else {
    throw new Error('Starting city not found');
  }
}

/*
 * Fly a player to any destination, regardless
 * of the origin city
 */
function fly (player, city, game) {
  if (game.map[city]) {
    player.position = city;
  } else {
    throw new Error('City not found');
  }
}

function walk (player, city, game) {
}

/* Finds a city that has a start attribute */
function findStartCity (map) {
  return _.findKey(map, function (city, name) {
    return city.start;
  });
}
