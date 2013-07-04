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
    p1 = {name: 'Player1'};
    p2 = {name: 'Player2'};
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

  describe('.end', function(){

    beforeEach(function(){
      game.turn = {player: p1};
      turns.end(game)
    });

    it('emits cards:draw event with current place twice', function(){
      assert.equal(game.e.withArgs('cards:draw', p1).callCount, 2);
    });

    it('emits cards:reveal event', function(){
      assert(game.e.calledWith('cards:reveal'));
    });

    it('emits turns:next event', function(){
      assert(game.e.calledWith('turns:new'))
    });

  });

  describe('.next', function(){

    beforeEach(function(){
      game.turn = {number: 1, order: [p1, p2], player: p1}
      turns.next(game);
    });

    it('increases the game turn number', function(){
      assert.equal(game.turn.number, 2);
    });

    it('set the next player as the current one', function(){
      assert.equal(game.turn.player, p2);
    });

    describe('when there is no next player', function(){

      it('set the 1st player as the current one', function(){
        game.turn = {order: [p1, p2], player: p2};
        turns.next(game);
        assert.equal(game.turn.player, p1);
      });

    });

  });

});
