var EventEmitter = require('events').EventEmitter;
var cities = require('./cities.js');
var zombies = require('./zombies.js');

module.exports = Game;

/* Game constructor */
function Game () {
  this._events = new EventEmitter();
  this.map = new cities.Map();
  bindEvents(this);
}

/* Alias for game._events.emit */
Game.prototype.e = function () {
  var args = [].slice.call(arguments);
  args.push(this);
  return this._events.emit.apply(this._events, args);
}

/*
 * Binds each event (key) to its
 * listener (value)
 */
function bindEvents (game) {
  var events = {
    'infect' : zombies.infect,
    'kill' : zombies.kill,
    'outbreak' : zombies.outbreak
  };

  for (var type in events) {
    if (events.hasOwnProperty(type)) {
      game._events.on(type, events[type]);
    }
  }
}
