var _ = require('lodash');

module.exports = {
  join: join
};

/*
 * Adds a [player] to a [game]
 * emits a playerJoined event
 */
function join (player, game) {
  if (isIn(game, player)) {
    game.e('error:playerJoined', player);
  } else if (isFull(game)) {
    game.e('error:gameFull', player);
  } else {
    game.players.push(player);
    game.e('playerJoined', player);
  }
}

function isIn (game, player) {
  return _.find(game.players, function(p) {
    return p === player;
  });
}

function isFull (game) {
  return game.players.length >= game.maxPlayers;
}
