var _ = require('lodash');

module.exports = {
  join: join,
  spentAction: spentAction
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
    game.e('players:joined', player);
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

function spentAction(player, game) {
  player.actions += 1;
  if (player.actions === player.maxActions) {
    game.e('turns:end');
  }
}
