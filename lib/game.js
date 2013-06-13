var EventEmitter = require('events').EventEmitter;
var zombies = require('./zombies.js');

module.exports = Game;

/* Game constructor */
function Game () {
  this.events = new EventEmitter();
  bindEvents(this);
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
