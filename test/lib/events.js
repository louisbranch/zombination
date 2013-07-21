var assert = require('assert');
var sinon = require('sinon');
var events = require('../../lib/events.js');
var epidemics = require('../../lib/epidemics.js');
var cards = require('../../lib/cards.js');
var cities = require('../../lib/cities.js');
var game = require('../../lib/game.js');
var groups = require('../../lib/groups.js');
var players = require('../../lib/players.js');
var turns = require('../../lib/turns.js');
var zombies = require('../../lib/zombies.js');

describe('events', function () {

  describe('.bindTo', function () {
    var emitter;

    beforeEach(function () {
      emitter = {on: sinon.spy()};
      events.bindTo(emitter);
    })

    it('binds to cards:add event', function(){
      assert(emitter.on.calledWith('cards:add', cards.add));
    });

    it('binds to cards:draw event', function(){
      assert(emitter.on.calledWith('cards:draw', cards.draw));
    });

    it('binds to cards:initialHand event', function(){
      assert(emitter.on.calledWith('cards:initialHand', cards.initialHand));
    });

    it('binds to cards:reveal event', function(){
      assert(emitter.on.calledWith('cards:reveal', cards.reveal));
    });

    it('binds to cities:fly', function(){
      assert(emitter.on.calledWith('cities:fly', cities.fly));
    });

    it('binds to cities:initialPosition', function(){
      assert(emitter.on.calledWith('cities:initialPosition', cities.initialPosition));
    });

    it('binds to cities:walk', function(){
      assert(emitter.on.calledWith('cities:walk', cities.walk));
    });

    it('binds to epidemics:shuffle', function(){
      assert(emitter.on.calledWith('epidemics:shuffle', epidemics.shuffle));
    });

    it('binds to game:start', function(){
      assert(emitter.on.calledWith('game:start', game.start));
    });

    it('binds to game:over', function(){
      assert(emitter.on.calledWith('game:over', game.over));
    });

    it('binds to players:act', function(){
      assert(emitter.on.calledWith('players:act', players.act));
    });

    it('binds to players:join', function(){
      assert(emitter.on.calledWith('players:join', players.join));
    });

    it('binds to turns:end', function(){
      assert(emitter.on.calledWith('turns:end', turns.end));
    });

    it('binds to turns:first', function(){
      assert(emitter.on.calledWith('turns:first', turns.first));
    });

    it('binds to turns:next', function(){
      assert(emitter.on.calledWith('turns:next', turns.next));
    });

    it('binds to zombies:infect event', function () {
      assert(emitter.on.calledWith('zombies:infect', zombies.infect));
    });

    it('binds to zombies:infected event', function () {
      assert(emitter.on.calledWith('zombies:infect:end', groups.remove));
    });

    it('binds to zombies:initialInfection event', function () {
      assert(emitter.on.calledWith('zombies:initialInfection', zombies.initialInfection));
    });

    it('binds to zombies:kill event', function () {
      assert(emitter.on.calledWith('zombies:kill', zombies.kill));
    });

    it('binds to zombies:killed event', function () {
      assert(emitter.on.calledWith('zombies:kill:end', groups.add));
    });

    it('binds to zombies:outbreak event', function () {
      assert(emitter.on.calledWith('zombies:outbreak', zombies.outbreak));
    });

  });

});
