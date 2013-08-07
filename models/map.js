var _ = require('lodash');
var json = require('../data/map.json');
var City = require('./city');

module.exports = Map;

function Map (file) {
  parseFile(file, this);
}

function parseFile(file, map) {
  file = file || json;

  _.each(file.nodes, function (attributes, name) {
    map[name] = new City(name, attributes)
  });

  _.each(file.links, function (link) {

    _.forOwn(link, function (target, source) {
      target = map[target];
      source = map[source];
      createConnections(target, source);
    });

  });
}

function createConnections (target, source) {
  target.connections.push(source.name);
  source.connections.push(target.name);
}
