var assert = require('assert');
var City = require('../../models/city.js');

describe('.new', function(){
  var city;

  beforeEach(function(){
    city = new City('Rio', {color: 'red'});
  });

  it('has a name', function(){
    assert.equal(city.name, 'Rio');
  });

  it('extends attributes passed', function(){
    assert.equal(city.color, 'red');
  });

  it('has an empty zombies list', function(){
    assert.equal(city.zombies.length, 0);
  });

  it('has an empty connections list', function(){
    assert.equal(city.connections.length, 0);
  });

});

describe('.toString', function(){

  it('outputs city name', function(){
    var city = new City('Rio');
    assert.equal(city.toString(), 'Rio');
  });

});


