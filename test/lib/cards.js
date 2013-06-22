var assert = require('assert');
var sinon = require('sinon');
var cards = require('../../lib/cards.js');

describe('cards', function () {
  var game, card, hand;

  var Card = function () {};

  beforeEach(function () {
    game = {
      e: sinon.spy(),
      decks: {
        players: [],
        zombies: []
      },
      piles: {
        players: [],
        zombies: []
      }
    };
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
      hand = [];
      game.decks.players = [new Card(), card];
      cards.draw(hand, game);
    });

    it('removes card from the top of the deck', function () {
      assert.equal(game.decks.players.length, 1);
    });

    it('emits addCard event', function () {
      assert(game.e.calledWith('addCard', hand, card));
    });

  });

  describe('.discard', function () {

    beforeEach(function () {
      hand = [card];
      cards.discard(hand, card, game);
    });

    it('removes card from hand', function () {
      assert.equal(hand.length, 0);
    });

    it('emits addCard event', function () {
      assert(game.e.calledWith('addCard', game.piles.players, card));
    });

  });

  describe('.reveal', function(){

    beforeEach(function(){
      card = {name: 'New York'};
      game.decks.zombies = [card];
      city = {};
      game.map = {'New York': city};
      cards.reveal(1, game);
    });

    it('removes n cards from the top of the zombies deck', function(){
      assert.equal(game.decks.zombies.length, 0);
    });

    it('emits infect event with the city revealed', function(){
      assert(game.e.calledWith('infect', city));
    });

    it('emits addCard event for zombies discard pile', function(){
      assert(game.e.calledWith('addCard', game.piles.zombies));
    });

  });

  describe('.initialHand', function(){

    describe('when there are 2 players', function(){
      it('emits 4 draw events for each player', function(){
        game.players = [{}, {}];
        cards.initialHand(game);
        assert.equal(game.e.callCount, 8);
      });
    });

    describe('when there are 3 players', function(){
      it('emits 3 draw events for each player', function(){
        game.players = [{}, {}, {}];
        cards.initialHand(game);
        assert.equal(game.e.callCount, 9);
      });
    });

    describe('when there are 4 players', function(){
      it('emits 2 draw events for each player', function(){
        game.players = [{}, {}, {}, {}];
        cards.initialHand(game);
        assert.equal(game.e.callCount, 8);
      });
    });

    describe('when there are 5 players', function(){
      it('emits 2 draw events for each player', function(){
        game.players = [{}, {}, {}, {}, {}];
        cards.initialHand(game);
        assert.equal(game.e.callCount, 10);
      });
    });

  });

});
