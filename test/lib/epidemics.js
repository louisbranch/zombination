var assert = require('assert');
var epidemics = require('../../lib/epidemics.js');
var Game = require('../../models/game.js');

describe('epidemics', function(){
  var game;

  beforeEach(function(){
    game = new Game();
  });

  it('returns 5 equally sized chunks of a deck', function(){
    var chunks = epidemics.setDifficulty(game);
    assert.equal(chunks.length, 5);
  });
});
