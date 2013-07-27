var assert = require('assert');
var sinon = require('sinon');
var _ = require('lodash');
var options = require('../../lib/play_options');
var Game = require('../../models/game');
var Player = require('../../models/player');
var Card = require('../../models/card');

describe('playOptions', function(){
  var game, player, city;

  beforeEach(function(){
    game = new Game();
    city = game.map[_.keys(game.map)[0]];
    player = new Player({position: city});
  });

  describe('.fly', function(){

    beforeEach(function(){

      player.hand = [new Card({name: 'New York'})];
    });

    it('can fly to other card cities', function(){
      var result = options.fly(player);
      assert.deepEqual(result, {'New York': ['flyTo']});
    });

    it('can fly from the current city with same card', function(){
      player.position = game.map['New York'];
      var result = options.fly(player);
      assert.deepEqual(result, {'New York': ['flyFrom']});
    });

  });

  describe('.cure', function(){

    it('can cure a color with 5 or more cards', function(){
      player.hand = [
        new Card({group: 'blue', name: 'New York'}),
        new Card({group: 'blue', name: 'Chicago'}),
        new Card({group: 'blue', name: 'Atlanta'}),
        new Card({group: 'blue', name: 'Montreal'}),
        new Card({group: 'blue', name: 'London'})
      ];
      var result = options.cure(player);
      assert.deepEqual(result, {
        'New York': ['cure'],
        'Chicago' : ['cure'],
        'Atlanta' : ['cure'],
        'Montreal': ['cure'],
        'London'  : ['cure']
      });
    });

    it('cant cure a color with less than 5 cards', function(){
      player.hand = [
        new Card({group: 'blue', name: 'New York'}),
        new Card({group: 'blue', name: 'Chicago'}),
        new Card({group: 'blue', name: 'Atlanta'}),
        new Card({group: 'blue', name: 'Montreal'})
      ];
      var result = options.cure(player);
      assert.deepEqual(result, {});
    });

  });

});
