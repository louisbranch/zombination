var _ = require('lodash');
var json = require('../data/map.json');
var Card = require('../models/card.js');

module.exports = formater;

/*
 * Format the json map data as list of cities
 * {name: x, group: group}
 */
function formater(data) {
  data = data || json;
  return _.map(data.nodes, function (attrs, name) {
    return new Card({name: name, group: attrs.group});
  });
}
