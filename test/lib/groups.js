var assert = require('assert');
var groups = require('../../lib/groups.js');
var Game = require('../../models/game.js');

describe('groups', function(){

  describe('.create', function(){

    it('creates a key/value map with group and max zombies per group', function(){
      var game = new Game();
      assert.deepEqual(groups.create(game), { yellow: 24, blue: 24, black: 24, red: 24 });
    });

  });

});
