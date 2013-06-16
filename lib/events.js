var _ = require('lodash');
var zombies = require('./zombies.js');

exports.bindTo = bindTo;

/* Binds each event to its listener on emitter */
function bindTo (emitter) {

  var events = {
    'infect' : zombies.infect,
    'kill' : zombies.kill,
    'outbreak' : zombies.outbreak
  };

  _.forOwn(events, function(fn, event) {
    emitter.on(event, fn);
  });

}
