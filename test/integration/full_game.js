var assert = require('assert');
var Game = require('../../models/game.js');
var Player = require('../../models/player.js');

describe('Game', function(){

  it('plays a full game', function(){
    var game = new Game();
    var player = new Player({name: 'Luiz'});
    var player2 = new Player({name: 'Larissa'});

    game.e('players:join', player);
    game.e('players:join', player2);
    game.e('game:start');

    player = game.turn.player;

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

    // Infect cities
    assert.equal(game.decks.zombies.length, 37);
    assert.equal(game.piles.zombies.length, 11);

    // Change current player
    assert.notDeepEqual(game.turn.player, player);
  });

});
