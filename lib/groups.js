var _ = require('lodash');

module.exports = {
  create: create
};

function create(game) {
  var result = {};
  var zombies = game.zombiesPerGroup;
  var groups = _.pluck(game.map, 'group');
  groups =  _.unique(groups);

  _.each(groups, function (group) {
    result[group] = zombies;
  });

  return result;
}
