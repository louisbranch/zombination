var assert = require('assert');
var sinon = require('sinon');
var setup = require('../../lib/setup.js');
var Game = require('../../models/game.js');

describe('setup', function(){
  var game, player;

  beforeEach(function(){
    game = new Game();
    game.e = sinon.spy();
    player = {};
  });

  describe('.join', function(){

    describe('when player is not in the game', function(){
      beforeEach(function(){
        setup.join(player, game);
      });

      it('adds a player to the players list', function(){
        assert.equal(game.players.length, 1);
      });

      it('emits the playerJoined event', function(){
        assert(game.e.calledWith('playerJoined', player));
      });
    });

    describe('when game is full', function(){
      beforeEach(function(){
        game.maxPlayers = 0;
        setup.join(player, game);
      });

      it('doesnt add player to game list', function(){
        assert.equal(game.players.length, 0);
      });

      it('emits the error:playerJoined event', function(){
        assert(game.e.calledWith('error:gameFull', player));
      });
    });

    describe('when player is already in', function(){
      beforeEach(function(){
        game.players = [player];
        setup.join(player, game);
      });

      it('doesnt add player twice', function(){
        assert.equal(game.players.length, 1);
      });

      it('emits the error:playerJoined event', function(){
        assert(game.e.calledWith('error:playerJoined', player));
      });
    });
  });
});
