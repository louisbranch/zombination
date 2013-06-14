var _ = require('lodash');

module.exports = {
  Map: Map
};

function Map (map) {
  var nodes = map.nodes;
  _.forEach(map.links, function (link) {

    _.forOwn(link, function (target, source) {
      target = nodes[target];
      source = nodes[source];
      createConnections(target, source);

      //FIXME move to general method about nodes
      target.zombies = [];
      source.zombies = [];
    });

  });

  return nodes;
}

function createConnections (target, source) {
  target.connections = target.connections || [];
  source.connections = source.connections || [];

  target.connections.push(source);
  source.connections.push(target);
}

