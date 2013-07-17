var assert = require('assert');
var Zombie = require('../../models/zombie.js');

describe('.new', function(){

  it('extends attributes passed', function(){
    var zombie = new Zombie(1);
    assert.equal(zombie.group, 1);
  });

});

describe('.toString', function(){

  it('outputs zombie', function(){
    var zombie = new Zombie({group: 1});
    assert.equal(zombie.toString(), 'ZOMBIE!!!');
  });

});


