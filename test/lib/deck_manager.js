var assert = require('assert');
var sinon = require('sinon');
var manager = require('../../lib/deck_manager.js');

describe('deck_manager', function () {
  var game, card, deck = [], hand = [], pile = [], length;

  var Card = function () {};

  beforeEach(function () {
    game = {e: sinon.spy()};
    card = new Card();
  });

  describe('.add', function() {
    it('adds a card to a list', function() {
      var list = [];
      manager.add(list, card);
      assert.equal(list[0], card);
    });
  });

  describe('.draw', function () {

    beforeEach(function () {
      deck = [new Card(), card];
      length = deck.length;
      manager.draw(deck, hand, game);
    });

    it('removes card from the top of the deck', function () {
      assert.equal(deck.length, length - 1);
    });

    it('emits addCard event', function () {
      assert(game.e.calledWith('addCard'), hand, card);
    });

  });

  describe('.discard', function () {

    beforeEach(function () {
      hand = [card];
      length = hand.length;
      manager.discard(hand, card, pile, game);
    });

    it('removes card from hand', function () {
      assert.equal(hand.length, length - 1);
    });

    it('emits addCard event', function () {
      assert(game.e.calledWith('addCard'), pile, card);
    });

  });

});

