var assert = require('assert');
var sinon = require('sinon');
var cities = require('../../lib/cities.js');
var Game = require('../../models/game.js');

describe('cities', function(){
  var game, player, city;

  beforeEach(function(){
    game = new Game();
    player = [];
    game.e = sinon.spy();
    game.players = [player]
  });

  describe('.startPosition', function(){
    it('emits cities:fly event to all players with starting city', function(){
      cities.startPosition(game);
      assert(game.e.calledWith('cities:fly', player, 'Atlanta'));
    });

    it('throws error when starting city doesnt exist', function(){
      game.map = [];
      assert.throws(function() {
        cities.startPosition(game);
      });
    });
  });

  describe('.fly', function(){

    describe('when city exists', function(){

      beforeEach(function(){
        city = 'New York'
        cities.fly(player, city, game);
      });

      it('moves a player to any city in the map', function(){
        assert.equal(player.position, city);
      });

      it('emits cities:enter event', function(){
        assert(game.e.calledWith('cities:enter', player, city));
      });
    });

    describe('when city doesnt exist', function(){
      it('throws error', function(){
        assert.throws(function() {
          cities.fly(player, 'Gotham City', game);
        });
      });
    });

  });

  describe('.walk', function(){

    describe('when player doesnt have an origin city', function(){
      it('throws error', function(){
        city = 'New York';
        assert.throws(function() {
          cities.walk(player, city, game);
        });
      });
    });

    describe('when city doesnt exist', function(){
      it('throws error', function(){
        assert.throws(function() {
          cities.walk(player, 'Gotham City', game);
        });
      });
    });

    describe('when city is connected to origin', function(){
      beforeEach(function(){
        player.position = 'Washington';
        city = 'New York';
        cities.walk(player, city, game);
      });

      it('emits cities:enter event', function(){
        assert(game.e.calledWith('cities:enter', player, city));
      });

      it('moves player to the destinantion', function(){
        assert.equal(player.position, city);
      });
    });

    describe('when city is not connected to origin', function(){

      it('throws error', function(){
        city = 'New York';
        player.position = 'Bagda';
        assert.throws(function() {
          cities.walk(player, city, game);
        });
      });

    });

  });

});
