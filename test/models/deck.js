var assert = require('assert');
var decks = require('../../models/deck.js');
var _ = require('lodash');

describe('decks', function () {

  describe('Zombies', function () {

    it('creates a zombie card for each city', function () {
      var deck = new decks.Zombies();
      assert.equal(deck.length, 48);
    });

    it('shuffles the cards each time', function () {
      var deck1 = new decks.Zombies();
      var deck2 = new decks.Zombies();
      assert.notDeepEqual(deck1, deck2);
    });

    describe('cards', function () {
      var card;

      beforeEach(function () {
        card = new decks.Zombies()[0];
      });

      it('has a name', function () {
        assert(card.name);
      });

      it('has a group', function () {
        assert(card.group);
      });

    });

  });

  describe('Players', function () {

    it('creates player card for each city plus special cards', function () {
      var deck = new decks.Players();
      assert.equal(deck.length, 58);
    })

    it('has a total of 5 event cards', function () {
      var deck = new decks.Players();
      var events = _.filter(deck, function (card) {
        return card.group === 'events';
      });
      assert.equal(events.length, 5);
    });

    it('has a customizable difficulty level', function () {
      var deck = new decks.Players('hard');
      var events = _.filter(deck, function (card) {
        return card.group === 'epidemics';
      });
      assert.equal(events.length, 6);
    });

    it('shuffles the cards each time', function () {
      var deck1 = new decks.Players();
      var deck2 = new decks.Players();
      assert.notDeepEqual(deck1, deck2);
    });

    describe('cards', function () {
      var card;

      beforeEach(function () {
        card = new decks.Players()[0];
      });

      it('has a name', function () {
        assert(card.name);
      });

      it('has a group', function () {
        assert(card.group);
      });

      describe('event cards', function () {

        beforeEach(function () {
          card = _.find(new decks.Players(), function (card) {
            return card.group === 'events';
          });
        });

        it('has a description', function () {
          assert(card.description);
        });
      });

    });

  });

});
