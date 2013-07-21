var _ = require('lodash');

module.exports = {
  add: add,
  create: create,
  remove: remove
};

/* Create group of zombies from map*/
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


/* Add a zombie to its group */
function add(zombie, game) {
  game.zombies[zombie.group] += 1;
}

/*
 * Remove a zombie from its group
 * End game with there is no more
 * zombies left
 */
function remove(zombie, game) {
  game.zombies[zombie.group] -= 1;
  if (game.zombies[zombie.group] === 0) {
    game.e('game:over', 'Ran out of zombies!');
  }
}
