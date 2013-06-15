var _ = require('lodash');
var json = require('../map.json');
var cachedMap;

module.exports = {
  Map: Map
};

function Map (map, purgeCache) {
  if (!purgeCache && cachedMap) {
    return _.cloneDeep(cachedMap);
  }

  map = map || json;
  var nodes = map.nodes;
  _.forEach(map.links, function (link) {

    _.forOwn(link, function (target, source) {
      target = nodes[target];
      source = nodes[source];
      createConnections(target, source);

    });

  });

  _.each(nodes, function (city) {
    city.zombies = []
  });

  if (!purgeCache) cachedMap = nodes;
  return nodes;
}

function createConnections (target, source) {
  target.connections = target.connections || [];
  source.connections = source.connections || [];

  target.connections.push(source);
  source.connections.push(target);
}

