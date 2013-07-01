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
function bindTo (emitter) {

  var events = {
    'cards:add' : cards.add,
    'cards:draw' : cards.draw,
    'cards:initialHand' : cards.initialHand,
    'cards:reveal' : cards.reveal,
    //'cities:entered' ;
    'cities:fly' : cities.fly,
    'cities:initialPosition' : cities.initialPosition,
    'cities:walk' : cities.walk,
    'epidemics:shuffle' : epidemics.shuffle,
    'game:init' : game.init,
    'players:join' : players.join,
    'players:spentAction' : players.spentAction,
    //'players:joined' :
    'turns:first' : turns.first,
    'turns:end' : turns.end,
    'zombies:infect' : zombies.infect,
    'zombies:infected' : zombies.infected,
    'zombies:initialInfection' : zombies.initialInfection,
    'zombies:kill' : zombies.kill,
    'zombies:killed' : zombies.killed,
    'zombies:outbreak' : zombies.outbreak
  };

  _.forOwn(events, function(fn, event) {
    emitter.on(event, fn);
  });

}
