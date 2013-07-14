var _ = require('lodash');

module.exports = {
  infect: infect,
  infected: infected,
  initialInfection: initialInfection,
  kill: kill,
  killed: killed,
  outbreak: outbreak
};

/* Kill [n] zombies on a [city] */
function kill(city, n, game) {
  while (n > 0 && city.zombies.length > 0) {
    var zombie = city.zombies.pop();
    game.e('zombies:kill:end', zombie);
    n -= 1;
  }
}

/*
 * Infect a [city] with [n] zombies
 * If a city would have more than
 * 3 zombies, an outbreak occurs instead
 * cities which have an outbreak already don't
 * have an outbreak twice
 */
function infect(city, opts, game) {
  _.defaults(opts, {zombies: 1, group: city.group, outbreaks: []});
  while (opts.zombies > 0 && city.zombies.length < 3) {
    var zombie = {group: city.group};
    city.zombies.push(zombie);
    game.e('zombies:infect:end', zombie);
    opts.zombies -= 1;
  }

  if (opts.zombies > 0 && !_.contains(opts.outbreaks, city)) {
    opts.outbreaks.push(city);
    game.e('zombies:outbreak', city, {outbreaks: opts.outbreaks});
  }
}

/* Remove a zombie from its group */
function infected(zombie, game) {
  game.zombies[zombie.group] -= 1;
  if (game.zombies[zombie.group] === 0) {
    game.e('game:over', 'Ran out of zombies!');
  }
}

/* Add a zombie to its group */
function killed(zombie, game) {
  game.zombies[zombie.group] += 1;
}

/*
 * Infect all connected cities with a zombie
 * of the same group as the outbreaking city
 */
function outbreak(city, opts, game) {
  _.forEach(city.connections, function (connection) {
    opts.group = city.group;
    game.e('zombies:infect', connection, opts);
  });
}

/*
 * Pick the first 9 cards from zombies deck
 * 3 are infected with 3 zombies
 * 3 are infected with 2 zombies
 * 3 are infected with 1 zombies
 */
function initialInfection(game) {
  for(var zombies = 3; zombies > 0; zombies--) {
    _.times(3, function () {
      var card = game.decks.zombies.pop();
      var city = game.map[card.name];
      game.e('zombies:infect', city, {zombies: zombies});
      game.piles.zombies.push(card);
    });
  }
}
