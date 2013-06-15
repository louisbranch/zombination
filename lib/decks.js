var _ = require('lodash');
var json = require('../data/map.json');

module.exports = {
  players: players,
  zombies: zombies
};

function players () {
  // body...
}

function zombies () {
  var cities = _.map(json.nodes, function (attrs, name) {
    return {
      name: name,
      group: attrs.group
    };
  });
  return _.shuffle(cities);
}
