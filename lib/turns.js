var _ = require('lodash');

module.exports = {
  first: first
};

function first(game) {
  game.turn = {
    number: 1,
    order: _.shuffle(game.players)
  }
  game.turn.player = _.first(game.turn.order);
  game.e('game:ready');
}
