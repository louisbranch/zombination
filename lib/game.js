module.exports = {
  init: init
};

function init (game) {
  game.e('cards:initialHand');
  game.e('cities:initialPosition');
  game.e('zombies:initialInfection');
  game.e('epidemics:shuffle');
  game.e('turns:first');
}
