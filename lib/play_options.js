var _ = require('lodash');

module.exports = {
  fly: fly,
  placeHQ: placeHQ,
  purge: purge,
  special: special,
  trade: trade
};

/*
 * If two players are on the same
 * city, list card that can be
 * traded
 */
function trade(player, game) {
  var cards = {};
  var card = _.find(player.hand, function (card) {
    return card.name === player.position.name;
  });
  if (card) {
    _.each(game.players, function (p) {
      if (player === p) return;
      if (p.position !== player.position) return;
      cards[card.name] = ['trade'];
    });
  }
  return cards;
}

/* List all special cards */
function special(player) {
  var cards = {};
  _.each(player.hand, function (card) {
    if (card.group === 'special') {
      cards[card.name] = ['special'];
    }
  });
  return cards;
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
