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
    decks: {
      zombies: new ZombieDeck(),
      players: new PlayerDeck()
    },
    difficulty: 'normal',
    infectionProgress: [2,2,2,3,3,4,4],
    infectionRateIndex: 0,
    epidemicCardsPerLevel: {
      easy: 4,
      normal: 5,
      hard: 6
    },
    minPlayers: 2,
    map: new Map(),
    maxHQs: 8, // ???
    maxOutbreaks: 8,
    maxPlayers: 5,
    outbreaks: 0,
    piles: {
      zombies: [],
      players: []
    },
    players: [],
    playersOrder: [],
    zombiesPerGroup: 24,
    zombies: {}
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
