var assert = require('assert');
var decks = require('../../lib/decks.js');
var _ = require('lodash');

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

  describe('.players', function () {

    it('creates player card for each city plus special cards', function () {
      var deck = decks.players();
      assert.equal(deck.length, 58);
    })

    it('has a total of 5 event cards', function () {
      var deck = decks.players();
      var events = _.filter(deck, function (card) {
        return card.group === 'events';
      });
      assert.equal(events.length, 5);
    });

    it('has a customizable difficulty level', function () {
      var deck = decks.players('hard');
      var events = _.filter(deck, function (card) {
        return card.group === 'epidemics';
      });
      assert.equal(events.length, 6);
    });

    it('shuffles the cards each time', function () {
      var deck1 = decks.players();
      var deck2 = decks.players();
      assert.notDeepEqual(deck1, deck2);
    });

    describe('cards', function () {
      var card;

      beforeEach(function () {
        card = decks.players()[0];
      });

      it('has a name', function () {
        assert(card.name);
      });

      it('has a group', function () {
        assert(card.group);
      });

      describe('event cards', function () {

        beforeEach(function () {
          card = _.find(decks.players(), function (card) {
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
