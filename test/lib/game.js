var assert = require('assert');
var sinon = require('sinon');
var lib = require('../../lib/game.js');
var Game = require('../../models/game.js');

describe('game/lib', function(){
  var game;

  beforeEach(function(){
    game = new Game;
    game.e = sinon.spy();
    lib.start(game);
  });

  describe('.start', function(){

    it('emits cards:initialHand event', function(){
      assert(game.e.calledWith('cards:initialHand'));
    });

    it('emits cities:initialPosition event', function(){
      assert(game.e.calledWith('cities:initialPosition'));
    });

    it('emits zombies:initialInfection event', function(){
      assert(game.e.calledWith('zombies:initialInfection'));
    });

    it('emits epidemics:shuffle event', function(){
      assert(game.e.calledWith('epidemics:shuffle'));
    });

    it('emits turns:first event', function(){
      assert(game.e.calledWith('turns:first'));
    });

  });

});
