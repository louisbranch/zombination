var assert = require('assert');
var _ = require('lodash');
var Game = require('../../models/game.js');
var Player = require('../../models/player.js');

describe('Game integration', function(){

  it('plays a full game', function(){
    var game = new Game();
    var luiz = new Player({name: 'Luiz'});
    var larissa = new Player({name: 'Larissa'});

    game.e('players:join', luiz);
    game.e('players:join', larissa);

    // Joins game
    assert.equal(game.players.length, 2);

    game.e('game:init');

    // Initial Hand
    assert.equal(luiz.hand.length, 4);

    // Initial city position
    assert.equal(luiz.position, 'Atlanta');

    // Initial infection
    assert.equal(game.decks.zombies.length, 39);
    assert.equal(game.piles.zombies.length, 9);
    assert.equal(_.where(game.map, function (city) {
      return city.zombies.length === 3;
    }).length, 3);
    assert.equal(_.where(game.map, function (city) {
      return city.zombies.length === 2;
    }).length, 3);
    assert.equal(_.where(game.map, function (city) {
      return city.zombies.length === 1;
    }).length, 3);

    // Shuffle epidemics
    assert.equal(game.decks.players.length, 50);

    // Initial Turn
    assert.equal(game.turn.number, 1);
    assert(_.contains(game.turn.order, luiz));
    assert(_.contains(game.turn.order, larissa));
    assert.equal(game.turn.player, game.turn.order[0]);
  });

});
