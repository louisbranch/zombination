var assert = require('assert');
var formater = require('../../lib/deck_formater.js');

describe('deck formater', function(){

  var deck;
  var map = {
    nodes: {
      'City1': {color: 'blue'},
      'City2': {color: 'yellow'}
    }
  };

  beforeEach(function(){
    deck = formater(map);
  });

  it('transforms a map representation into a list of cities', function(){
    assert.equal(deck.length, 2);
  });

  it('copies the city properties', function() {
    assert.deepEqual(deck[0], {name: 'City1', color: 'blue'});
  });

});

