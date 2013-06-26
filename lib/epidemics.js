var _ = require('lodash');
var cards = require('../data/cards.json');

module.exports = {
  setDifficulty: setDifficulty
};

function setDifficulty (game) {
  var epidemics = createEpidemicCards(game);
  return spliceDeck(game.decks.players, 6, []);
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

function spliceDeck (deck, parts, acc) {
  if (parts === 0) return acc;
  var n = Math.floor(deck.length / parts);
  acc.push(deck.splice(0, n));
  return spliceDeck(deck, parts - 1, acc);
}
