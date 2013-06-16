module.exports = {
  add: add,
  draw: draw,
  discard: discard,
  reveal: reveal
};

function add (list, card, game) {
  list.push(card);
}

function draw (deck, hand, game) {
  var card = deck.pop();
  game.e('addCard', hand, card);
}

function discard (hand, card, pile, game) {
  var i = hand.indexOf(hand);
  hand.splice(i,1);
  game.e('addCard', pile, card);
}

function reveal (deck, pile, number, game) {
  number = number || 2;
}
