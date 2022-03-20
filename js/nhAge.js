'use strict';

document.addEventListener("DOMContentLoaded", () => {
  var date = new Date();
  var year = date.getFullYear();
  var age = year-1984;
  document.getElementById('age').innerHTML = toWords(age);
});
