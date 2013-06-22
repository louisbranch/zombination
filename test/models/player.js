var assert = require('assert');
var Player = require('../../models/player.js');

describe('Player', function(){
  var player;

  beforeEach(function(){
    player = new Player();
  });

  it('has an empty hand', function(){
    assert.equal(player.hand.length, 0);
  });

  describe('.toString', function(){
    it('outputs player name and role', function(){
      player = new Player({name: 'Luiz', role: 'Medic'});
      assert.equal(player.toString(), 'Luiz [Medic]');
    });
  });

});
