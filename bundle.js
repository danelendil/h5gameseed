'use strict';
var log = require('loglevel');
var Game = require('gamejs/lib/Game');
var UI = require('gameui/lib/UI');

log.setLevel(log.levels.TRACE);

var players = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' },
];

var opts = {
  size: '2',
  scoreLimit: '50'
};

// bootstrap
document.addEventListener('DOMContentLoaded', function(event) {
  var game = new Game(opts, players, false);
  game.init();
  
  new UI(document.body, game);
});
