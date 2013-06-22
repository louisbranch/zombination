var _ = require('lodash');

module.exports = {
  add: add,
  draw: draw,
  discard: discard,
  initialHand: initialHand,
  play: play,
  reveal: reveal
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
 * Reveal cards from the zombies deck
 * equals to game infection rate
 * Emit event to infect city
 * Emit event to add card to zombies
 * discard pile
 */
function reveal (game) {
  var number = game.infectionRate;
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

function initialHand (game) {
  var cards;
  switch(game.players.length) {
    case 2:
      cards = 4;
      break;
    case 3:
      cards = 3;
      break
    default:
      cards = 2;
  }
  _.each(game.players, function (player) {
    _.times(cards, function () {
      game.e('draw', player.hand);
    });
  });
}
