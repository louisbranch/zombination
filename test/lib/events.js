var assert = require('assert');
var sinon = require('sinon');
var events = require('../../lib/events.js');
var zombies = require('../../lib/zombies.js');
var cards = require('../../lib/cards.js');

describe('events', function () {

  describe('.bindTo', function () {
    var emitter;

    beforeEach(function () {
      emitter = {on: sinon.spy()};
      events.bindTo(emitter);
    })

    it('binds to infect event', function () {
      assert(emitter.on.calledWith('infect', zombies.infect));
    });

    it('binds to kill event', function () {
      assert(emitter.on.calledWith('kill', zombies.kill));
    });

    it('binds to outbreak event', function () {
      assert(emitter.on.calledWith('outbreak', zombies.outbreak));
    });

    it('binds to addCard event', function(){
      assert(emitter.on.calledWith('addCard', cards.add));
    });

  });

});
