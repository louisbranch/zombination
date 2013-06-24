var assert = require('assert');
var sinon = require('sinon');
var events = require('../../lib/events.js');
var cards = require('../../lib/cards.js');
var cities = require('../../lib/cities.js');
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

    it('binds to cities:enter', function(){
      assert(emitter.on.calledWith('cities:enter', cities.enter));
    });

    it('binds to cities:fly', function(){
      assert(emitter.on.calledWith('cities:fly', cities.fly));
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
