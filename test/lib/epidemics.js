var assert = require('assert');
var _ = require('lodash');
var epidemics = require('../../lib/epidemics.js');
var Game = require('../../models/game.js');

describe('epidemics', function(){
  var game, level;

  beforeEach(function(){
    game = new Game();
    level = game.epidemicCardsPerLevel[game.difficulty];
  });

  describe('.shuffle', function(){

    it('adds epidemic cards to players deck equally to game difficulty', function(){
      var originalLength = game.decks.players.length;
      epidemics.shuffle(game);
      var newLength = game.decks.players.length;
      assert.equal(originalLength + level, newLength);
    });

    it('distributes epidemics cards equally', function(){
      epidemics.shuffle(game);
      var deck = game.decks.players;
      var size = Math.floor(deck.length / level);
      var chunk = _.first(deck, size);
      var cards = _.where(chunk, function (card) {
        return card.name === 'Epidemic';
      });
      assert.equal(cards.length, 1);
    });

  });

});
