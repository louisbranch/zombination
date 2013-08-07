var _ = require('lodash');
var Zombie = require('../models/zombie');

module.exports = {
  infect: infect,
  initialInfection: initialInfection,
  kill: kill,
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
  _.defaults(opts, {zombies: 1, color: city.color, outbreaks: []});
  while (opts.zombies > 0 && city.zombies.length < 3) {
    var zombie = new Zombie(city.color);
    city.zombies.push(zombie);
    game.e('zombies:infect:end', zombie);
    opts.zombies -= 1;
  }

  if (opts.zombies > 0 && !_.contains(opts.outbreaks, city)) {
    opts.outbreaks.push(city);
    game.e('zombies:outbreak', city, {outbreaks: opts.outbreaks});
  }
}

/*
 * Infect all connected cities with a zombie
 * of the same color as the outbreaking city
 */
function outbreak(city, opts, game) {
  _.forEach(city.connections, function (connection) {
    opts.color = city.color;
    connection = game.map[connection];
    game.e('zombies:infect', connection, opts);
  });
}

/*
 * Pick the first 9 cards from zombies deck
 * 3 are infected with 3 zombies
 * 3 are infected with 2 zombies
 * 3 are infected with 1 zombie
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
