var _ = require('lodash');

module.exports = {
  check: check,
  cure: cure,
  fly: fly,
  placeHQ: placeHQ
};

function check(player, game) {
  return _.merge(
    {},
    cure(player),
    fly(player),
    function (a, b) {
      a = a || [];
      return a.concat(b);
    }
  );
}

function tradeCards(player, game) {
  // TODO
}

function cure(player) {
  var groups = _.groupBy(player.hand, 'group');
  return curable(groups);
}

function curable(groups) {
  var cards = {}
  _.each(groups, function (group, color) {
    if (group.length < 5)  return;
    _.each(group, function (card) {
      cards[card.name] = ['cure'];
    });
  });
  return cards;
}

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

function placeHQ(player, game) {
  var cards = {};
  _.each(player.hand, function (card) {
    if (canHaveHQ(player.position, card)) {
      cards[card.name] = ['placeHQ'];
    }
  });
  return cards;
}

function canHaveHQ(city, card) {
  return city.name === card.name && !city.hq;
}
