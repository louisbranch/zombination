var assert = require('assert');
var Game = require('../../lib/game.js');
var EventEmitter = require('events').EventEmitter;
var zombies = require('../../lib/zombies.js');

describe('Game.new', function () {

  var game = new Game();

  it('returns a new game', function () {
    assert(game instanceof Game);
  });

  it('has an Event Emitter', function () {
    assert(game.events instanceof EventEmitter);
  })

  it('binds to infect event', function () {
    var listeners = game.events.listeners('infect');
    assert.deepEqual(listeners, [zombies.infect]);
  });

  it('binds to kill event', function () {
    var listeners = game.events.listeners('kill');
    assert.deepEqual(listeners, [zombies.kill]);
  });

});
