var _ = require('lodash');

module.exports = Player;

var DEFAULTS = function () {
  return {
    hand: [],
    actions: 4
  };
};

/*
 * Player constructor extend options
 * or use defaults values
 */
function Player (options) {
  _.extend(this, DEFAULTS(), options);
}
