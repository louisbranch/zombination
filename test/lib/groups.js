var assert = require('assert');
var sinon = require('sinon');
var groups = require('../../lib/groups.js');
var Game = require('../../models/game.js');

describe('groups', function(){
  var game;

  beforeEach(function(){
    game = new Game();
    game.e = sinon.spy();
  });

  describe('.create', function(){

    it('creates a key/value map with colors and max zombies per colors', function(){
      assert.deepEqual(groups.create(game), { yellow: 24, blue: 24, black: 24, red: 24 });
    });

  });

  describe('.add', function(){

    it('adds a zombie to the color pool', function(){
      var zombie = {color: 'yellow'};
      pool = game.zombies[zombie.color];
      groups.add(zombie, game);
      assert.equal(game.zombies[zombie.color], pool + 1);
    });

  });

  describe('.remove', function(){
    var zombie, pool;

    beforeEach(function(){
      zombie = {color: 'yellow'};
    });

    it('removes a zombie from the color pool', function(){
      pool = game.zombies[zombie.color];
      groups.remove(zombie, game);
      assert.equal(game.zombies[zombie.color], pool - 1);
    });

    it('emits game:over event if pool reaches 0', function(){
      game.zombies[zombie.color] = 1;
      groups.remove(zombie, game);
      assert(game.e.calledWith('game:over', 'Ran out of zombies!'));
    });

  });


});
