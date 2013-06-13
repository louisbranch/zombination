var search = require('./search.js');
var utils = require('./utils.js');
var _ = require('lodash');

module.exports = {
  infect: infect,
  kill: kill,
  outbreak: outbreak
};

/* Kill [n] zombies on a [city] */
function kill (city, n, game) {
  while (n > 0 && city.zombies > 0) {
    city.zombies -= 1;
    n -= 1;
    game.e('zombieRemoved');
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
  _.defaults(opts, {zombies: 1, color: city.color, outbreaks: []});
  city.zombies = city.zombies || 0; // FIXME
  while (opts.zombies > 0 && city.zombies < 3) {
    city.zombies += 1;
    opts.zombies -= 1;
  }

  if (opts.zombies > 0 && !_.contains(city, opts.outbreaks)) {
    opts.outbreaks.push(city);
    game.e('outbreak', city, {outbreaks: opts.outbreaks});
  }
}

/*
 * Infect all connected cities with a zombie
 * of the same color as the outbreaking city
 */
function outbreak (city, opts, game) {
  search.connections(city, function (connection) {
    opts.color = city.color;
    game.e('infect', connection, opts);
  });
}
