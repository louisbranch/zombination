module.exports = {
  init: init
};

/*
 * Prepare the game for the first
 * turn
 */
function init(game) {
  game.e('cards:initialHand');
  game.e('cities:initialPosition');
  game.e('zombies:initialInfection');
  game.e('epidemics:shuffle');
  game.e('turns:first');
}
