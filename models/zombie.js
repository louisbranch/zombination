module.exports = Zombie;

function Zombie(color) {
  this.color = color;
}

Zombie.prototype.toString = function () {
  return this.color + " ZOMBIE!!!";
};
