var assert = require('assert');
var Game = require('../../lib/game.js');
var EventEmitter = require('events').EventEmitter;
var zombies = require('../../lib/zombies.js');
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

  describe('._events', function () {

    it('is an Event Emitter', function () {
      assert(game._events instanceof EventEmitter);
    })

    it('binds to infect event', function () {
      var listeners = game._events.listeners('infect');
      assert.deepEqual(listeners, [zombies.infect]);
    });

    it('binds to kill event', function () {
      var listeners = game._events.listeners('kill');
      assert.deepEqual(listeners, [zombies.kill]);
    });

    it('binds to outbreak event', function () {
      var listeners = game._events.listeners('outbreak');
      assert.deepEqual(listeners, [zombies.outbreak]);
    });

  });

  describe('.e', function () {
    it('emits an event shovelling game to callback', function () {
      var spy = sinon.spy();
      game._events.on('test', spy);
      game.e('test', 1, 2);
      assert(spy.calledWith(1, 2, game));
    });
  });

});
