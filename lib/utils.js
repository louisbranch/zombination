module.exports = {
  containsCity: containsCity,
  copy: copy
};

/* Test if a [city] is in the [list] */
function containsCity (city, list) {
  for (var i = 0; i < list.length; i++) {
    if (city === list[i]) {
      return true;
    }
  }
}

/* Return a copy of a list */
function copy (list) {
  return [].slice.call(list);
}
