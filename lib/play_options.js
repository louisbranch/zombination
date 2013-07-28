var _ = require('lodash');

module.exports = {
  purge: purge,
  fly: fly,
  placeHQ: placeHQ,
  special: special
};

/*
 * If two player are on the same
 * city, list cards that can be
 * traded
 */
function tradeCards(player, game) {
  // TODO
}

/* List all special cards */
function special(player) {
  // TODO
}

/*
 * If there are more than 5 cards with
 * the same color list those cards
 */
function purge(player) {
  var cards = {}
  var colors = _.groupBy(player.hand, 'color');
  _.each(colors, function (group, color) {
    if (group.length < 5)  return;
    _.each(group, function (card) {
      cards[card.name] = ['purge'];
    });
  });
  return cards;
}

/*
 * Lists cards that the player can fly to
 * and if there is a card with the same
 * name as the player current city, list
 * this card as fly from
 */
function fly(player) {
  var cards = {};
  _.each(player.hand, function (card) {
    if (player.position.name === card.name) {
      cards[card.name] = ['flyFrom'];
    } else {
      cards[card.name] = ['flyTo'];
    }
  });
  return cards;
}

function placeHQ(player) {
  var cards = {};
  var city = player.position;
  _.each(player.hand, function (card) {
    if (city.name === card.name && !city.hq) {
      cards[card.name] = ['placeHQ'];
    }
  });
  return cards;
}
