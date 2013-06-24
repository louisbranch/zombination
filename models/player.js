var _ = require('lodash');

module.exports = Player;

var DEFAULTS = function () {
  return {
    actions: 0,
    hand: [],
    maxActions: 4,
    maxHand: 7,
    role: null
  };
};

/*
 * Player constructor extend options
 * or use defaults values
 */
function Player (options) {
  _.extend(this, DEFAULTS(), options);
}

Player.prototype.toString = function () {
  return this.name + ' [' + this.role + ']';
}
