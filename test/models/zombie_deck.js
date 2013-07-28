var assert = require('assert');
var ZombieDeck = require('../../models/zombie_deck.js');

describe('ZombieDeck', function () {
  var deck;

  beforeEach(function(){
    deck = new ZombieDeck();
  });

  it('creates a zombie card for each city', function () {
    assert.equal(deck.length, 48);
  });

  it('shuffles the cards each time', function () {
    var deck2 = new ZombieDeck();
    assert.notDeepEqual(deck, deck2);
  });

  describe('cards', function () {
    var card;

    beforeEach(function () {
      card = deck[0];
    });

    it('has a name', function () {
      assert(card.name);
    });

    it('has a color', function () {
      assert(card.color);
    });

  });

});
