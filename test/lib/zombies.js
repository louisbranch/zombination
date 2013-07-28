var assert = require('assert');
var sinon = require('sinon');
var _ = require('lodash');
var zombies = require('../../lib/zombies.js');
var Game = require('../../models/game.js');

describe('zombies', function () {
  var city, game;

  beforeEach(function () {
    game = new Game();
    game.e = sinon.spy();
    city = {name: 'Fake City', color: 'blue', zombies: [], connections: []};
  });

  describe('.infect', function () {

    it('adds a zombie to a city', function () {
      zombies.infect(city, {}, game);
      assert.deepEqual(city.zombies, [{color: 'blue'}]);
    });

    it('adds up to 3 zombies to a city', function () {
      zombies.infect(city, {zombies: 4}, game);
      assert.deepEqual(city.zombies, [{color: 'blue'}, {color: 'blue'}, {color: 'blue'}]);
    });

    it('emits outbreak event if city would have more than 3 zombies', function () {
      zombies.infect(city, {zombies: 4}, game);
      assert(game.e.withArgs('zombies:outbreak').calledOnce);
    });

    it('emits zombies:infect:end', function(){
      zombies.infect(city, {}, game);
      assert(game.e.calledWith('zombies:infect:end'));
    });

    it('does not outbreak the same city twice during the same call', function () {
      var crowded = {name: 'crowded', zombies: 3, connections: [city]};
      city.connections = [crowded];
      zombies.infect(city, {zombies: 4}, game);
      assert(game.e.withArgs('zombies:outbreak', city).calledOnce);
    });

  });

  describe('.outbreak', function () {

    it('emits infect event with all cities connected to a city outbreaking', function () {
      city.connections = [{zombies: []}, {zombies: []}, {zombies: []}];
      zombies.outbreak(city, {}, game);
      assert.equal(game.e.withArgs('zombies:infect').callCount, city.connections.length)
    });

  });

  describe('.kill', function () {

    beforeEach(function () {
      zombies.infect(city, {zombies: 3}, game);
    });

    it('removes zombies from a city', function () {
      zombies.kill(city, 1, game);
      assert.equal(city.zombies.length, 2);
    });

    it('removes up to 3 zombies from a city', function () {
      zombies.kill(city, 4, game);
      assert.equal(city.zombies.length, 0);
    });

    it('emits zombieRemoved event', function () {
      zombies.kill(city, 2, game);
      assert.equal(game.e.withArgs('zombies:kill:end').callCount, 2);
    });

  });

  describe('.initialInfection', function(){
    var deckSize, pileSize;

    beforeEach(function(){
      deckSize = game.decks.zombies.length;
      pileSize = game.piles.zombies.length;
      zombies.initialInfection(game);
    });

    it('removes 9 cards from zombies deck', function(){
      assert.equal(game.decks.zombies.length, deckSize - 9);
    });

    it('adds those cards to zombies pile', function(){
      assert.equal(game.piles.zombies.length, pileSize + 9);
    });

    it('emits infect event 9 times', function(){
      assert.equal(game.e.withArgs('zombies:infect').callCount, 9);
    });

    it('emits infect event first 3 cities with 3 zombies', function(){
      var result = infectTestHelper([0,1,2], 3);
      assert.equal(result.length, 3);
    });

    it('emits infect event next 3 cities with 2 zombies', function(){
      var result = infectTestHelper([3,4,5], 2);
      assert.equal(result.length, 3);
    });

    it('emits infect event last 3 cities with 1 zombie', function(){
      var result = infectTestHelper([6,7,8], 1);
      assert.equal(result.length, 3);
    });

    function infectTestHelper (range, zombiesCount) {
      var calls = [];
      _.each(range, function (callIndex) {
        calls.push(game.e.getCall(callIndex));
      });
      return  _.where(calls, function (call) {
        return call.args[2].zombies === zombiesCount;
      })
    }

  });

});
