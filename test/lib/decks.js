var assert = require('assert');
var decks = require('../../lib/decks.js');

describe('decks', function () {

  describe('.zombies', function () {

    it('creates a zombie card for each city', function () {
      var deck = decks.zombies();
      assert.equal(deck.length, 48);
    });

    it('shuffles the cards each time', function () {
      var deck1 = decks.zombies();
      var deck2 = decks.zombies();
      assert.notDeepEqual(deck1, deck2);
    });

    describe('cards', function () {
      var card;

      beforeEach(function () {
        card = decks.zombies()[0];
      });

      it('has a name', function () {
        assert(card.name);
      });

      it('has a group', function () {
        assert(card.group);
      });

    });

  });

});
