var assert = require('assert');
var PlayerDeck = require('../../models/player_deck.js');
var _ = require('lodash');

describe('Players', function () {

  it('creates player card for each city plus special cards', function () {
    var deck = new PlayerDeck();
    assert.equal(deck.length, 58);
  })

  it('has a total of 5 event cards', function () {
    var deck = new PlayerDeck();
    var events = _.filter(deck, function (card) {
      return card.group === 'events';
    });
    assert.equal(events.length, 5);
  });

  it('has a customizable difficulty level', function () {
    var deck = new PlayerDeck('hard');
    var events = _.filter(deck, function (card) {
      return card.group === 'epidemics';
    });
    assert.equal(events.length, 6);
  });

  it('shuffles the cards each time', function () {
    var deck1 = new PlayerDeck();
    var deck2 = new PlayerDeck();
    assert.notDeepEqual(deck1, deck2);
  });

  describe('cards', function () {
    var card;

    beforeEach(function () {
      card = new PlayerDeck()[0];
    });

    it('has a name', function () {
      assert(card.name);
    });

    it('has a group', function () {
      assert(card.group);
    });

    describe('event cards', function () {

      beforeEach(function () {
        card = _.find(new PlayerDeck(), function (card) {
          return card.group === 'events';
        });
      });

      it('has a description', function () {
        assert(card.description);
      });
    });

  });

});

