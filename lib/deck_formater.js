var _ = require('lodash');
var json = require('../data/map.json');

exports.deck = deck;

function deck () {
  return _.map(json.nodes, function (attrs, name) {
    return {
      name: name,
      group: attrs.group
    };
  });
}
