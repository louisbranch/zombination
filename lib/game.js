var EventEmitter = require('events').EventEmitter;
var zombies = require('./zombies.js');

module.exports = Game;

/* Game constructor */
function Game () {
  this.events = new EventEmitter();
  bindEvents(this);
}

/* Alias for game.events.emit */
Game.prototype.e = function () {
  var args = [].slice.call(arguments);
  return this.events.emit.apply(this.events, args);
}

/*
 * Binds each event (key) to its
 * listener (value)
 */
function bindEvents (game) {
  var events = {
    'infect' : zombies.infect,
    'kill' : zombies.kill
  };

  for (var type in events) {
    if (events.hasOwnProperty(type)) {
      game.events.on(type, events[type]);
    }
  }
}
