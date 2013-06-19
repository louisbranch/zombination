var assert = require('assert');
var Game = require('../../models/game.js');
var EventEmitter = require('events').EventEmitter;
var sinon = require('sinon');

describe('Game.new', function () {
  var game;

  beforeEach(function () {
    game = new Game();
  });

  it('returns a new game', function () {
    assert(game instanceof Game);
  });

  describe('.map', function () {
    it('has 48 cities', function () {
      var cities = Object.keys(game.map);
      assert.equal(cities.length, 48);
    });
  });

  describe('.decks', function(){

    it('has a full zombies deck', function(){
      assert.equal(game.decks.zombies.length, 48);
    });

    it('has an empty zombies discard pile', function(){
      assert.equal(game.piles.zombies.length, 0);
    });

    it('has a full players deck', function(){
      assert.equal(game.decks.players.length, 58);
    });

    it('has an empty players discard pile', function(){
      assert.equal(game.piles.players.length, 0);
    });

  });

  describe('._emitter', function () {

    it('is an Event Emitter', function () {
      assert(game._emitter instanceof EventEmitter);
    });

    it('has events bound to it', function () {
      var bound = Object.keys(game._emitter._events);
      assert(bound.length > 0);
    });

  });

  describe('.e', function () {
    it('emits an event shovelling game to callback', function () {
      var spy = sinon.spy();
      game._emitter.on('test', spy);
      game.e('test', 1, 2);
      assert(spy.calledWith(1, 2, game));
    });
  });

});
