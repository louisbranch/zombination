var _ = require('lodash');
var cards = require('./cards.js');
var cities = require('./cities.js');
var epidemics = require('./epidemics.js');
var groups = require('./groups.js');
var players = require('./players.js');
var zombies = require('./zombies.js');

exports.bindTo = bindTo;

/* Binds each event to its listener on [emitter] */
function bindTo (emitter) {

  var events = {
    'cards:add' : cards.add,
    'cards:draw' : cards.draw,
    'cards:initialHand' : cards.initialHand,
    //'cities:entered' ;
    'cities:fly' : cities.fly,
    'cities:initialPosition' : cities.initialPosition,
    'cities:walk' : cities.walk,
    'epidemics:shuffle' : epidemics.shuffle,
    'players:join' : players.join,
    //'players:joined' :
    'zombies:infect' : zombies.infect,
    'zombies:kill' : zombies.kill,
    //'zombies:killed' :
    'zombies:outbreak' : zombies.outbreak
  };

  _.forOwn(events, function(fn, event) {
    emitter.on(event, fn);
  });

}
