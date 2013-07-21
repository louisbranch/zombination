var _ = require('lodash');
var cards = require('./cards.js');
var cities = require('./cities.js');
var epidemics = require('./epidemics.js');
var game = require('./game.js');
var groups = require('./groups.js');
var players = require('./players.js');
var turns = require('./turns.js');
var zombies = require('./zombies.js');

exports.bindTo = bindTo;

/* Binds each event to its listener on [emitter] */
function bindTo(emitter) {

  var events = {
    'cards:add' : cards.add,
    'cards:draw' : cards.draw,
    'cards:initialHand' : cards.initialHand,
    'cards:reveal' : cards.reveal,
    //'cities:enter:end' ;
    'cities:fly' : cities.fly,
    'cities:initialPosition' : cities.initialPosition,
    'cities:walk' : cities.walk,
    'epidemics:shuffle' : epidemics.shuffle,
    'game:start' : game.start,
    'players:act' : players.act,
    'players:join' : players.join,
    //'players:join:end' :
    //'players:join:error' :
    'turns:end' : turns.end,
    'turns:first' : turns.first,
    'turns:next' : turns.next,
    'zombies:infect' : zombies.infect,
    'zombies:infect:end' : groups.remove,
    'zombies:initialInfection' : zombies.initialInfection,
    'zombies:kill' : zombies.kill,
    'zombies:kill:end' : groups.add,
    'zombies:outbreak' : zombies.outbreak
  };

  _.forOwn(events, function(fn, event) {
    emitter.on(event, fn);
  });

}
