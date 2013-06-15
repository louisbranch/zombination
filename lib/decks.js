var _ = require('lodash');
var json = require('../data/map.json');
var cards = require('../data/cards.json');

var DIFFICULTY_LEVELS = {
  easy: 4,
  normal: 5,
  hard: 6
};

module.exports = {
  players: players,
  zombies: zombies
};

function players (difficulty) {
  var deck = formatDeck();
  epidemics = setDifficulty(difficulty);
  deck = deck.concat(cards.events, epidemics);
  return _.shuffle(deck);
}

function zombies () {
  return _.shuffle(formatDeck());
}

function formatDeck () {
  return _.map(json.nodes, function (attrs, name) {
    return {
      name: name,
      group: attrs.group
    };
  });
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
