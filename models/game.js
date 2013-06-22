var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Map = require('./map.js');
var PlayerDeck = require('../models/player_deck.js');
var ZombieDeck = require('../models/zombie_deck.js');
var events = require('../lib/events.js');

module.exports = Game;

var DEFAULTS = function () {
  return {
    _emitter: new EventEmitter(),
    map: new Map(),
    infectionRate: 2,
    minPlayers: 2,
    maxPlayers: 5,
    players: [],
    decks: {
      zombies: new ZombieDeck(),
      players: new PlayerDeck()
    },
    piles: {
      zombies: [],
      players: []
    }
  };
};

/*
 * Game constructor extend options
 * or use defaults values
 */
function Game (options) {
  _.extend(this, DEFAULTS(), options);
  events.bindTo(this._emitter);
}

/*
 * Alias for game._emitter.emit
 * shovelling game as the last callback
 * argument
 */
Game.prototype.e = function () {
  var args = _.toArray(arguments);
  //TODO call async db log
  args.push(this);
  return this._emitter.emit.apply(this._emitter, args);
}
