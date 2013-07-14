var _ = require('lodash');

module.exports = {
  act: act,
  join: join,
  spentAction: spentAction
};

/*
 * Adds a [player] to a [game]
 * emits a playerJoined event
 */
function join(player, game) {
  if (isIn(game, player)) {
    game.e('players:join:error', player, 'Player is already in game');
  } else if (isFull(game)) {
    game.e('players:join:error', player, 'Game is full');
  } else {
    game.players.push(player);
    game.e('players:join:end', player);
  }
}

function act(player, eventParams, game) {
  var args = _.toArray(eventParams);
  game.once(eventParams[0] + ':end', function () {
    spentAction(player, game);
  });
  game.e.apply(game, args);
}

function spentAction(player, game) {
  player.actions += 1;
  if (player.actions === player.maxActions) {
    game.e('turns:end');
  }
}

function isIn(game, player) {
  return _.find(game.players, function(p) {
    return p === player;
  });
}

function isFull(game) {
  return game.players.length >= game.maxPlayers;
}
