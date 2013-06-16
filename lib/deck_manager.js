module.exports = {
  draw: draw,
  discard: discard,
  reveal: reveal
};

function draw (deck, hand, game) {
  var card = deck.pop();
  hand.push(card);
}

function discard (hand, card, pile, game) {
  var i = hand.indexOf(hand);
  hand.splice(i,1);
  pile.push(card);
}

function reveal (deck, pile, number, game) {
  number = number || 2;
}
