var _ = require('lodash');

module.exports = {
  add: add,
  create: create,
  remove: remove
};

/* Create color of zombies from map*/
function create(game) {
  var result = {};
  var zombies = game.zombiesPerColor;
  var colors = _.pluck(game.map, 'color');
  colors =  _.unique(colors);

  _.each(colors, function (color) {
    result[color] = zombies;
  });

  return result;
}


/* Add a zombie to its color */
function add(zombie, game) {
  game.zombies[zombie.color] += 1;
}

/*
 * Remove a zombie from its color
 * End game with there is no more
 * zombies left
 */
function remove(zombie, game) {
  game.zombies[zombie.color] -= 1;
  if (game.zombies[zombie.color] === 0) {
    game.e('game:over', 'Ran out of zombies!');
  }
}
