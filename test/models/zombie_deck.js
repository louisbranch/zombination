var assert = require('assert');
var ZombieDeck = require('../../models/zombie_deck.js');

describe('Zombies', function () {

  it('creates a zombie card for each city', function () {
    var deck = new ZombieDeck();
    assert.equal(deck.length, 48);
  });

  it('shuffles the cards each time', function () {
    var deck1 = new ZombieDeck();
    var deck2 = new ZombieDeck();
    assert.notDeepEqual(deck1, deck2);
  });

  describe('cards', function () {
    var card;

    beforeEach(function () {
      card = new ZombieDeck()[0];
    });

    it('has a name', function () {
      assert(card.name);
    });

    it('has a group', function () {
      assert(card.group);
    });

  });

});
