var _ = require('lodash');

module.exports = {
  infect: infect,
  kill: kill,
  outbreak: outbreak
};

/* Kill [n] zombies on a [city] */
function kill (city, n, game) {
  while (n > 0 && city.zombies.length > 0) {
    var zombie = city.zombies.pop();
    game.e('zombies:killed', zombie);
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
function infect (city, opts, game) {
  _.defaults(opts, {zombies: 1, group: city.group, outbreaks: []});
  while (opts.zombies > 0 && city.zombies.length < 3) {
    var zombie = {group: city.group};
    city.zombies.push(zombie);
    game.e('zombies:infected', zombie);
    opts.zombies -= 1;
  }

  if (opts.zombies > 0 && !_.contains(opts.outbreaks, city)) {
    opts.outbreaks.push(city);
    game.e('zombies:outbreak', city, {outbreaks: opts.outbreaks});
  }
}

/*
 * Infect all connected cities with a zombie
 * of the same group as the outbreaking city
 */
function outbreak (city, opts, game) {
  _.forEach(city.connections, function (connection) {
    opts.group = city.group;
    game.e('zombies:infect', connection, opts);
  });
}
