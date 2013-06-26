var _ = require('lodash');
var cards = require('../data/cards.json');

module.exports = {
  setDifficulty: setDifficulty
};

function setDifficulty (game) {
  var deck = game.decks.players;
  deck = createAndShuffleEpidemics(deck, level(game), []);
  game.decks.players = deck;
}

function createAndShuffleEpidemics (deck, parts, acc) {
  if (parts === 0) return acc;
  var chunk = createChunk(deck, parts);
  acc = acc.concat(chunk);
  return createAndShuffleEpidemics(deck, parts - 1, acc);
}

function createChunk (deck, parts) {
  var n = Math.floor(deck.length / parts);
  var chunk = deck.splice(0, n);
  chunk.push(card());
  return _.shuffle(chunk);
}

function level (game) {
  var difficulty = game.difficulty;
  return game.epidemicCardsPerLevel[difficulty];
}

function card () {
  return _.clone(cards.epidemics);
}
