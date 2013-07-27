var _ = require('lodash');

module.exports = {
  check: check
};

function check(player, game) {
  return cure(player, game);
}

function tradeCards(player, game) {
  // TODO
}

function cure(player, game) {
  var groups = _.groupBy(player.hand, 'group');
  return curable(groups);
}

function curable(groups) {
  var cure = {}
  _.each(groups, function (group) {
    if (group.length < 5)  return;
    _.each(group, function (card) {
      cure[card.name] = ['cure'];
    });
  });
  return cure;
}
