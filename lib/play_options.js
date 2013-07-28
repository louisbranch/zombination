var _ = require('lodash');

module.exports = {
  cure: cure,
  fly: fly,
  placeHQ: placeHQ
};

function tradeCards(player, game) {
  // TODO
}

/*
 * If there are more than 5 cards with
 * the same color list those cards
 */
function cure(player) {
  var cards = {}
  var groups = _.groupBy(player.hand, 'group');
  _.each(groups, function (group, color) {
    if (group.length < 5)  return;
    _.each(group, function (card) {
      cards[card.name] = ['cure'];
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
