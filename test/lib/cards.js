var assert = require('assert');
var sinon = require('sinon');
var cards = require('../../lib/cards');
var Game = require('../../models/game');
var Player = require('../../models/player');
var Card = require('../../models/card');

describe('cards', function () {
  var game, card, player;

  beforeEach(function () {
    game = new Game();
    player = new Player();
    game.e = sinon.spy();
    card = {};
  });

  describe('.add', function() {
    it('adds a card to a list', function() {
      var list = [];
      cards.add(list, card);
      assert.equal(list[0], card);
    });
  });

  describe('.check', function(){

    it('list all cards options on the player hand', function(){
      player.position = game.map['New York'];
      player.hand = [
        new Card({group: 'blue', name: 'New York'}),
        new Card({group: 'blue', name: 'Chicago'}),
        new Card({group: 'blue', name: 'Atlanta'}),
        new Card({group: 'blue', name: 'Montreal'}),
        new Card({group: 'blue', name: 'London'})
      ];
      var result = cards.check(player, game);
      assert.deepEqual(result, {
        'New York': ['cure', 'flyFrom', 'placeHQ'],
        'Chicago' : ['cure', 'flyTo'],
        'Atlanta' : ['cure', 'flyTo'],
        'Montreal': ['cure', 'flyTo'],
        'London'  : ['cure', 'flyTo']
      });
    });

  });

  describe('.draw', function () {

    beforeEach(function () {
      game.decks.players = [{}, card];
      cards.draw(player, game);
    });

    it('removes card from the top of the deck', function () {
      assert.equal(game.decks.players.length, 1);
    });

    it('emits cards:add event', function () {
      assert(game.e.calledWith('cards:add', player.hand, card));
    });

  });

  describe('.discard', function () {

    beforeEach(function () {
      player.hand = [card];
      cards.discard(player, card, game);
    });

    it('removes card from hand', function () {
      assert.equal(player.hand.length, 0);
    });

    it('emits cards:add event', function () {
      assert(game.e.calledWith('cards:add', game.piles.players, card));
    });

  });

  describe('.reveal', function(){

    beforeEach(function(){
      var card1 = {name: 'New York'};
      var card2 = {name: 'Bagda'};
      game.decks.zombies = [card1, card2];
      city = {};
      game.map = {'New York': city};
      cards.reveal(game);
    });

    it('reveals cards equals to game infection rate from the top of the zombies deck', function(){
      assert.equal(game.decks.zombies.length, 0);
    });

    it('emits infect event with the city revealed', function(){
      assert(game.e.calledWith('zombies:infect', city, {zombies: 1}));
    });

    it('emits cards:add event for zombies discard pile', function(){
      assert(game.e.calledWith('cards:add', game.piles.zombies));
    });

  });

  describe('.initialHand', function(){

    describe('when there are 2 players', function(){
      it('emits 4 draw events for each player', function(){
        game.players = [new Player(), new Player()];
        cards.initialHand(game);
        assert.equal(game.e.withArgs('cards:draw').callCount, 8);
      });
    });

    describe('when there are 3 players', function(){
      it('emits 3 draw events for each player', function(){
        game.players = [new Player(), new Player(), new Player()];
        cards.initialHand(game);
        assert.equal(game.e.withArgs('cards:draw').callCount, 9);
      });
    });

    describe('when there are 4 players', function(){
      it('emits 2 draw events for each player', function(){
        game.players = [new Player(), new Player(), new Player(), new Player()];
        cards.initialHand(game);
        assert.equal(game.e.withArgs('cards:draw').callCount, 8);
      });
    });

    describe('when there are 5 players', function(){
      it('emits 2 draw events for each player', function(){
        game.players = [new Player(), new Player(), new Player(), new Player(), new Player()];
        cards.initialHand(game);
        assert.equal(game.e.withArgs('cards:draw').callCount, 10);
      });
    });

  });
});
