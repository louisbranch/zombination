var assert = require('assert');
var sinon = require('sinon');
var players = require('../../lib/players.js');
var Game = require('../../models/game.js');
var Player = require('../../models/player.js');

describe('players', function(){
  var game, player;

  beforeEach(function(){
    game = new Game();
    game.e = sinon.spy();
    player = new Player();
  });

  describe('.join', function(){

    describe('when player is not in the game', function(){
      beforeEach(function(){
        players.join(player, game);
      });

      it('adds a player to the players list', function(){
        assert.equal(game.players.length, 1);
      });

      it('emits the players:joined event', function(){
        assert(game.e.calledWith('players:join:end', player));
      });
    });

    describe('when game is full', function(){
      beforeEach(function(){
        game.maxPlayers = 0;
        players.join(player, game);
      });

      it('doesnt add player to game list', function(){
        assert.equal(game.players.length, 0);
      });

      it('emits the players:join:error event', function(){
        assert(game.e.calledWith('players:join:error', player));
      });
    });

    describe('when player is already in', function(){
      beforeEach(function(){
        game.players = [player];
        players.join(player, game);
      });

      it('doesnt add player twice', function(){
        assert.equal(game.players.length, 1);
      });

      it('emits the error:playerJoined event', function(){
        assert(game.e.calledWith('players:join:error', player));
      });
    });
  });

  describe('.act', function(){
    var city;

    beforeEach(function(){
      city = {name: 'Chicago'}
      game.once = sinon.spy();
      players.act(player, ['cities:walk', player, city], game);
    });

    it('forwards event to game', function(){
      assert(game.e.calledWith('cities:walk', player, city));
    });

    it('subscribes to same event on end condition', function(){
      assert(game.once.calledWith('cities:walk:end'));
    });

    describe('when event ends', function(){

      beforeEach(function(){
        game = new Game();
        players.act(player, ['test:event', player], game);
      });

      it('increase the number of player action', function(){
        game.e('test:event:end');
        assert.equal(player.actions, 1);
      });

      it('emits turns:end event when player reaches max actions', function(){
        player.actions = 3;
        game.e = sinon.spy();
        game._emitter.emit('test:event:end');
        assert(game.e.calledWith('turns:end'));
      });

    });

  });

});
