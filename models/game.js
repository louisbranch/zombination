var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Map = require('./map.js');
var PlayerDeck = require('../models/player_deck.js');
var ZombieDeck = require('../models/zombie_deck.js');
var events = require('../lib/events.js');

module.exports = Game;

/* Game constructor */
function Game (options) {
  options = options || {};

  _.defaults(options, {
    maxPlayers: 5,
    _emitter: new EventEmitter(),
    map: new Map(),
    decks: {
      zombies: new ZombieDeck(),
      players: new PlayerDeck()
    },
    piles: {
      zombies: [],
      players: []
    }
  });

  _.extend(this, options);
  events.bindTo(this._emitter);
}

/* Alias for game._emitter.emit */
Game.prototype.e = function () {
  var args = [].slice.call(arguments);
  //TODO call async db log
  args.push(this);
  return this._emitter.emit.apply(this._emitter, args);
}
