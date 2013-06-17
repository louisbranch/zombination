var assert = require('assert');
var sinon = require('sinon');
var cards = require('../../lib/cards.js');

describe('cards', function () {
  var game, card, deck = [], hand = [], pile = [], length;

  var Card = function () {};

  beforeEach(function () {
    game = {e: sinon.spy()};
    card = new Card();
  });

  describe('.add', function() {
    it('adds a card to a list', function() {
      var list = [];
      cards.add(list, card);
      assert.equal(list[0], card);
    });
  });

  describe('.draw', function () {

    beforeEach(function () {
      deck = [new Card(), card];
      length = deck.length;
      cards.draw(deck, hand, game);
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
      cards.discard(hand, card, pile, game);
    });

    it('removes card from hand', function () {
      assert.equal(hand.length, length - 1);
    });

    it('emits addCard event', function () {
      assert(game.e.calledWith('addCard'), pile, card);
    });

  });

});

