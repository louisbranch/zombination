var _ = require('lodash');
var deckFormater = require('../lib/deck_formater.js')
var cards = require('../data/cards.json');

module.exports = PlayerDeck;

function PlayerDeck () {
  var deck = deckFormater();
  deck = deck.concat(cards.events);
  return _.shuffle(deck);
}

