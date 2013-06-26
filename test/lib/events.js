var assert = require('assert');
var sinon = require('sinon');
var events = require('../../lib/events.js');
var epidemics = require('../../lib/epidemics.js');
var cards = require('../../lib/cards.js');
var cities = require('../../lib/cities.js');
var groups = require('../../lib/groups.js');
var players = require('../../lib/players.js');
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

    it('binds to cities:fly', function(){
      assert(emitter.on.calledWith('cities:fly', cities.fly));
    });

    it('binds to cities:startPosition', function(){
      assert(emitter.on.calledWith('cities:startPosition', cities.startPosition));
    });

    it('binds to cities:walk', function(){
      assert(emitter.on.calledWith('cities:walk', cities.walk));
    });

    it('binds to epidemics:setDifficulty', function(){
      assert(emitter.on.calledWith('epidemics:setDifficulty', epidemics.setDifficulty));
    });

    it('binds to groups:create', function(){
      assert(emitter.on.calledWith('groups:create', groups.create));
    });

    it('binds to players:join', function(){
      assert(emitter.on.calledWith('players:join', players.join));
    });

    it('binds to zombies:infect event', function () {
      assert(emitter.on.calledWith('zombies:infect', zombies.infect));
    });

    it('binds to zombies:kill event', function () {
      assert(emitter.on.calledWith('zombies:kill', zombies.kill));
    });

    it('binds to zombies:outbreak event', function () {
      assert(emitter.on.calledWith('zombies:outbreak', zombies.outbreak));
    });


  });

});
