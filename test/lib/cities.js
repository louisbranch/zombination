var assert = require('assert');
var sinon = require('sinon');
var cities = require('../../lib/cities.js');
var Game = require('../../models/game.js');

describe('cities', function(){
  var game, player;

  beforeEach(function(){
    game = new Game();
    player = [];
    game.e = sinon.spy();
    game.players = [player]
  });

  describe('.startPosition', function(){
    it('emits fly event to all players with starting city', function(){
      cities.startPosition(game);
      assert(game.e.calledWith('fly', player, 'Atlanta'));
    });

    it('throws error when starting city doesnt exist', function(){
      game.map = [];
      assert.throws(function() {
        cities.startPosition(game);
      });
    });
  });

  describe('.fly', function(){
    it('moves a player to any city in the map', function(){
      var city = 'New York'
      cities.fly(player, city, game);
      assert.equal(player.position, city);
    });

    it('throws error when city doesnt exist', function(){
      assert.throws(function() {
        cities.fly(player, 'Gotham City', game);
      });
    });
  });

});
