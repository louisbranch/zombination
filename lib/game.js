module.exports = {
  start: start,
  over: over
};

/*
 * Prepare the game for the first
 * turn
 */
function start(game) {
  game.e('cards:initialHand');
  game.e('cities:initialPosition');
  game.e('zombies:initialInfection');
  game.e('epidemics:shuffle');
  game.e('turns:first');
}

/*
 * End game when players lost
 */
function over(reason, game) {
  // TODO
}
