var _ = require('lodash');
var cards = require('../data/cards.json');

module.exports = setDifficulty;

function setDifficulty (game) {
  var epidemics = createEpidemicCards(game);
}

function createEpidemicCards (game) {
  var level = game.level;
  var number = game.epidemicCardsPerLevel[level];
  var card = cards.epidemics;
  var epidemics = [];
  _.times(number, function () {
    epidemics.push(card);
  });
  return epidemics;
}
