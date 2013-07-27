var _ = require('lodash');

module.exports = {
  check: check,
  cure: cure,
  fly: fly
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
  var cure = {}
  _.each(groups, function (group, color) {
    if (group.length < 5)  return;
    _.each(group, function (card) {
      cure[card.name] = ['cure'];
    });
  });
  return cure;
}

function fly(player) {
  var fly = {};
  _.each(player.hand, function (card) {
    if (player.position.name === card.name) {
      fly[card.name] = ['flyFrom'];
    } else {
      fly[card.name] = ['flyTo'];
    }
  });
  return fly;
}
