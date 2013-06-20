var _ = require('lodash');
var deckFormater = require('../lib/deck_formater.js')

module.exports = ZombieDeck;

function ZombieDeck() {
  return _.shuffle(deckFormater());
}
