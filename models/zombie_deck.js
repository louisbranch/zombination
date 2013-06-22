var _ = require('lodash');
var deckFormater = require('../lib/deck_formater.js')

module.exports = ZombieDeck;

/*
 * Shuffles a deck contaning a
 * card for each city
 */
function ZombieDeck() {
  return _.shuffle(deckFormater());
}
