var assert = require('assert');
var _ = require('lodash');
var Game = require('../../models/game.js');
var Player = require('../../models/player.js');

describe('Game integration', function(){
  var game, player, player2;

  beforeEach(function(){
    game = new Game();
    player = new Player({name: 'Luiz'});
    player2 = new Player({name: 'Larissa'});

    game.e('players:join', player);
    game.e('players:join', player2);
  });

  it('prepares the game', function(){
    // Joins game
    assert.equal(game.players.length, 2);

    game.e('game:init');

    // Initial Hand
    assert.equal(player.hand.length, 4);

    // Initial city position
    assert.equal(player.position, 'Atlanta');

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
    assert.equal(zombiesTotal(game), 24 * 4 - (3 * 3 + 3 * 2 + 3 * 1));

    // Shuffle epidemics
    assert.equal(game.decks.players.length, 50);

    // Initial Turn
    assert.equal(game.turn.number, 1);
    assert(_.contains(game.turn.order, player));
    assert(_.contains(game.turn.order, player2));
    assert.equal(game.turn.player, game.turn.order[0]);
  });

  it('plays a turn', function(){
    game.e('game:init');
    var player = game.turn.player;
    var zombiesAtStart = zombiesTotal(game);

    // Player walks to cities
    game.e('players:act', player, ['cities:walk', player, 'Chicago']);
    assert.equal(player.position, 'Chicago');
    assert.equal(player.actions, 1);

    // Player spends all actions
    game.e('players:act', player, ['cities:walk', player, 'Montreal']);
    game.e('players:act', player, ['cities:walk', player, 'New York']);
    game.e('players:act', player, ['cities:walk', player, 'London']);
    assert.equal(player.actions, 4);

    // Draw 2 more cards (one can be an epidemic card)
    assert(player.hand.length > 4);

    // End of turn

    // Infect cities
    assert.equal(game.decks.zombies.length, 37);
    assert.equal(game.piles.zombies.length, 11);
    //assert(zombiesAtStart == zombiesTotal(game));

    // Change current player
    assert.notDeepEqual(game.turn.player, player);
  });

  function zombiesTotal(game) {
    return _.foldr(game.zombies, function (total, zombies) {
      return total += zombies;
    }, 0);
  }

});
