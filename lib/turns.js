var _ = require('lodash');

module.exports = {
  end: end,
  first: first,
  next: next
};

function first(game) {
  game.turn = {
    number: 1,
    order: _.shuffle(game.players)
  }
  game.turn.player = _.first(game.turn.order);
  game.e('game:ready');
}

function end(game) {
  var player = game.turn.player;
  _.times(2, function () {
    game.e('cards:draw', player);
  });
  game.e('cards:reveal');
  game.e('turns:next');
}

function next(game) {
  game.turn.number += 1;
  game.turn.player = nextPlayer(game);
}

function nextPlayer(game) {
  var current = game.turn.player;
  var index = _.indexOf(game.turn.order, current);
  var next = game.turn.order[index + 1];
  if (next) return next;
  else return game.turn.order[0];
}
