var _ = require('lodash');

module.exports = {
  add: add,
  draw: draw,
  discard: discard,
  reveal: reveal,
  play: play
};

/* Adds a [card] to a [deck] */
function add (deck, card, game) {
  deck.push(card);
}

/*
 * Draw a card from players deck
 * Emit event to add card to [hand]
 */
function draw (hand, game) {
  var card = game.decks.players.pop();
  game.e('addCard', hand, card);
}

/*
 * Discard a [card] from a [hand]
 * Emit event to add card to players
 * discard pile
 */
function discard (hand, card, game) {
  var i = hand.indexOf(hand);
  hand.splice(i,1);
  game.e('addCard', game.piles.players, card);
}

/*
 * Reveal a card from the zombies deck
 * Emit event to infect city
 * Emit event to add card to zombies
 * discard pile
 */
//FIXME replace number with game infection rate
function reveal (number, game) {
  _.times(number, function () {
    var card = game.decks.zombies.pop();
    var city = game.map[card.name];
    game.e('infect', city);
    game.e('addCard', game.piles.zombies, card);
  });
}

function play (hand, card, game) {
  // TODO
}
