var assert = require('assert');
var PlayerDeck = require('../../models/player_deck.js');
var _ = require('lodash');

describe('PlayerDeck', function () {
  var deck;

  beforeEach(function(){
    deck = new PlayerDeck();
  });

  it('creates player card for each city plus events cards', function () {
    assert.equal(deck.length, 53);
  })

  it('has a total of 5 event cards', function () {
    var events = _.filter(deck, function (card) {
      return card.group === 'events';
    });
    assert.equal(events.length, 5);
  });

  it('shuffles the cards each time', function () {
    var deck2 = new PlayerDeck();
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

    it('has a group', function () {
      assert(card.group);
    });

    describe('event cards', function () {

      beforeEach(function () {
        card = _.find(deck, function (card) {
          return card.group === 'events';
        });
      });

      it('has a description', function () {
        assert(card.description);
      });
    });
  });
});
