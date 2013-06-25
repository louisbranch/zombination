var _ = require('lodash');
var cards = require('./cards.js');
var cities = require('./cities.js');
var groups = require('./groups.js');
var players = require('./players.js');
var zombies = require('./zombies.js');

exports.bindTo = bindTo;

/* Binds each event to its listener on [emitter] */
function bindTo (emitter) {

  var events = {
    'cards:add' : cards.add,
    'cards:draw' : cards.draw,
    //'cities:entered' ;
    'cities:fly' : cities.fly,
    'cities:startPosition' : cities.startPosition,
    'cities:walk' : cities.walk,
    'groups:create' : groups.create,
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
