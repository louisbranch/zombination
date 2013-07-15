var _ = require('lodash');
var deckFormater = require('../lib/deck_formater.js')
var cards = require('../data/cards.json');
var Card = require('../models/card.js');

module.exports = PlayerDeck;

function PlayerDeck () {
  var deck = deckFormater();
  deck = deck.concat(eventCards());
  return _.shuffle(deck);
}


function eventCards() {
  return _.map(cards.events, function (card) {
    return new Card(card);
  });
}
