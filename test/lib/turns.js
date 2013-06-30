var assert = require('assert');
var sinon = require('sinon');
var _ = require('lodash');
var turns = require('../../lib/turns.js');
var Game = require('../../models/game.js');

describe('turns', function(){
  var game, p1, p2;

  beforeEach(function(){
    game = new Game();
    game.e = sinon.spy();
    p1 = {};
    p2 = {};
    game.players = [p1, p2];
  });

  describe('.first', function(){

    beforeEach(function(){
      turns.first(game);
    });

    it('sets game turn number to 1', function(){
      assert.equal(game.turn.number, 1);
    });

    it('shuffles the player order', function(){
      assert(game.turn.order[0] === p1 || game.turn.order[0] === p2);
    });

    it('sets initial player as the first one in order', function(){
      assert.equal(game.turn.player, game.turn.order[0]);
    });

    it('emits game:ready event', function(){
      assert(game.e.calledWith('game:ready'));
    });

  });

});
