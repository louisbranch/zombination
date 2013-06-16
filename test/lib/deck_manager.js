var assert = require('assert');
var sinon = require('sinon');
var manager = require('../../lib/deck_manager.js');

describe('deck_manager', function () {
  var game, deck, hand, card, pile, length;

  var Card = function () {};

  beforeEach(function () {
    game = {e: sinon.spy()};
    card = new Card();
  });

  describe('.draw', function () {

    beforeEach(function () {
      deck = [new Card(), card];
      length = deck.length;
      hand = [];
      manager.draw(deck, hand, game);
    });

    it('removes card from the top of the deck', function () {
      assert.equal(deck.length, length - 1);
    });

    it('adds card to hand', function () {
      assert.equal(hand[0], card);
    });

  });

  describe('.discard', function () {

    beforeEach(function () {
      hand = [card];
      length = hand.length;
      pile = [];
      manager.discard(hand, card, pile, game);
    });

    it('removes card from hand', function () {
      assert.equal(hand.length, length - 1);
    });

    it('adds card to discard pile', function () {
      assert.equal(pile[0], card);
    });

  });

});

