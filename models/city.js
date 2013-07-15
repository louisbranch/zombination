var _ = require('lodash');

module.exports = City;

function City(name, attributes) {
  var defaults = {
    zombies: [],
    connections: []
  };
  _.extend(this, {name: name}, defaults, attributes);
}

City.prototype.toString = function () {
  return this.name;
};
