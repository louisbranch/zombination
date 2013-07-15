var _ = require('lodash');

module.exports = Card;

function Card(attributes) {
  _.extend(this, attributes);
}

Card.prototype.toString = function () {
  return this.name;
};
