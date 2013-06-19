var assert = require('assert');
var format = require('../../lib/deck_formater.js');

describe('formater', function(){

  describe('.deck', function(){

    var deck;
    var map = {
      nodes: {
        'City1': {group: 1},
        'City2': {group: 2}
      }
    };

    beforeEach(function(){
      deck = format.deck(map);
    });

    it('transforms a map representation into a list of cities', function(){
      assert.equal(deck.length, 2);
    });

    it('copies the city properties', function() {
      assert.deepEqual(deck[0], {name: 'City1', group: 1});
    });

  });

});
