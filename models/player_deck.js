var _ = require('lodash');
var format = require('../lib/deck_formater.js')
var cards = require('../data/cards.json');

module.exports = PlayerDeck;

var DIFFICULTY_LEVELS = {
  easy: 4,
  normal: 5,
  hard: 6
};

function PlayerDeck (difficulty) {
  var deck = format.deck();
  epidemics = setDifficulty(difficulty);
  deck = deck.concat(cards.events, epidemics);
  return _.shuffle(deck);
}

function setDifficulty (difficulty) {
  difficulty = difficulty || 'normal';
  level = DIFFICULTY_LEVELS[difficulty];
  var card = cards.epidemics;
  var epidemics = [];
  _.times(level, function () {
    epidemics.push(card);
  });
  return epidemics;
}
