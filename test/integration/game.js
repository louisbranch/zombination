var assert = require('assert');
var _ = require('lodash');
var Game = require('../../models/game.js');
var Player = require('../../models/player.js');

describe('Game integration', function(){
  var game, luiz, larissa;

  beforeEach(function(){
    game = new Game();
    luiz = new Player({name: 'Luiz'});
    larissa = new Player({name: 'Larissa'});

    game.e('players:join', luiz);
    game.e('players:join', larissa);
  });

  it('prepares the game', function(){
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

    // Remove zombies from pool
    var zombiesTotal = _.foldr(game.zombies, function (total, zombies) {
      return total += zombies;
    }, 0);
    assert.equal(zombiesTotal, 24 * 4 - (3 * 3 + 3 * 2 + 3 * 1));

    // Shuffle epidemics
    assert.equal(game.decks.players.length, 50);

    // Initial Turn
    assert.equal(game.turn.number, 1);
    assert(_.contains(game.turn.order, luiz));
    assert(_.contains(game.turn.order, larissa));
    assert.equal(game.turn.player, game.turn.order[0]);
  });

  it('plays a turn', function(){
    game.e('game:init');

    // Player walk to cities
    game.e('cities:walk', luiz, 'Chicago');
    assert.equal(luiz.position, 'Chicago');
    assert.equal(luiz.actions, 1);

    // Player spend all actions
    game.e('cities:walk', luiz, 'Montreal');
    game.e('cities:walk', luiz, 'New York');
    game.e('cities:walk', luiz, 'London');
    assert.equal(luiz.actions, 4);
  });

});
