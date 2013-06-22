var assert = require('assert');
var groups = require('../../lib/groups.js');
var Game = require('../../models/game.js');

describe('groups', function(){

  describe('.create', function(){

    it('creates a key/value map with group and max zombies per group', function(){
      var game = new Game();
      assert.deepEqual(groups.create(game), { 1: 24, 2: 24, 3: 24, 4: 24 });
    });

  });

});
