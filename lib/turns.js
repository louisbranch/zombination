var _ = require('lodash');

module.exports = {
  first: first,
  end: end
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
  game.e('cards:draw', player);
}

function next(game) {
  game.turn += 1;
}
