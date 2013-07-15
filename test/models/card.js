var assert = require('assert');
var Card = require('../../models/card.js');

describe('.new', function(){

  it('extends attributes passed', function(){
    var card = new Card({name: 'Test Card'});
    assert.equal(card.name, 'Test Card');
  });

});

