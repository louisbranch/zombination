module.exports = Zombie;

function Zombie(group) {
  this.group = group;
}

Zombie.prototype.toString = function () {
  return this.group + " ZOMBIE!!!";
};
