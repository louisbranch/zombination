var EventEmitter = require('events').EventEmitter;
var Map = require('./map.js');
var events = require('./events.js');
var decks = require('./decks.js');

module.exports = Game;

/* Game constructor */
function Game () {
  this._emitter = new EventEmitter();
  events.bindTo(this._emitter);
  this.map = new Map();
  this.decks = {
    zombies: decks.zombies(),
    players: decks.players()
  };
  this.piles = {
    zombies: [],
    players: []
  };
}

/* Alias for game._emitter.emit */
Game.prototype.e = function () {
  var args = [].slice.call(arguments);
  //TODO call async db log
  args.push(this);
  return this._emitter.emit.apply(this._emitter, args);
}
