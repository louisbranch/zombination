var utils = require('./utils.js');

module.exports = {
  infect: infect,
  kill: kill
};

/* kill one or multiple [times] zombies on a [city] */
function kill (city, times) {
  times = times || 1;
  if (city.zombies - times < 0) {
    city.zombies = 0;
  } else {
    city.zombies -= times;
  }
}

/*
 * Infect a [city] with zombies one or multiple
 * [times]. If a city would have more than
 * 3 zombies, an outbreak occurs instead
 */
function infect (city, times, hasOutbreak) {
  var times = times || 1;
  city.zombies = city.zombies || 0;
  if (city.zombies + times > 3) {
    city.zombies = 3;
    outbreak(city, hasOutbreak);
  } else {
    city.zombies += times;
  }
}

/*
 * Add [city] to [hasOutbreak] list
 * Infect all connected cities,
 * cities which have an outbreak already don't
 * have an outbreak twice
 */
function outbreak (city, hasOutbreak) {
  hasOutbreak = hasOutbreak || [];
  hasOutbreak.push(city);

  utils.eachConnection(city, function (connection) {
    if (!utils.containsCity(connection, hasOutbreak)) {
      infect(connection, 1, hasOutbreak);
    }
  });
}

