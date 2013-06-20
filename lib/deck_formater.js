var _ = require('lodash');
var json = require('../data/map.json');

module.exports = formater;

function formater (data) {
  data = data || json;
  return _.map(data.nodes, function (attrs, name) {
    return {
      name: name,
      group: attrs.group
    };
  });
}
