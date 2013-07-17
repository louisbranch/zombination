var _ = require('lodash');
var json = require('../data/map.json');
var City = require('./city');
var cachedMap;

module.exports = Map;

function Map (map, purgeCache) {
  map = map || json;
  var nodes = map.nodes;

  _.each(map.nodes, function (attributes, name) {
    nodes[name] = new City(name, attributes)
  });

  _.each(map.links, function (link) {

    _.forOwn(link, function (target, source) {
      target = nodes[target];
      source = nodes[source];
      createConnections(target, source);
    });

  });

  return nodes;
}

function createConnections (target, source) {
  target.connections.push(source);
  source.connections.push(target);
}
