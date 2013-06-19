var _ = require('lodash');
var format = require('../lib/deck_formater.js')

module.exports = ZombieDeck;

function ZombieDeck() {
  return _.shuffle(format.deck());
}
