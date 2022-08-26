'use strict';
var rdclicks = 0;

// Manually trigger the razzle dazzle
document.getElementById('joystick').onclick = () => {
  rdclicks++;
  if(rdclicks%3 == 0) {
    console.log("Give 'em the ole razzle-dazzle"); // DEBUG:
    razzledazzle();
    if(rdclicks%6 == 0) {
      boring();
    }
  }
}

// Randomly give them the razzle-dazzle just because
document.addEventListener("DOMContentLoaded", () => {
  if(Math.floor(Math.random() * 13) == 0) {
    console.log("Lucky winner!"); // DEBUG:
    razzledazzle(true);
  }
});

// Slap some pretty on everything
function razzledazzle() {
  let elements = document.querySelectorAll('.rd');
  elements.forEach((elem, i) => {
    elements[i].classList.add('rda');
  });
  let r = document.querySelector(':root');
  let jt = document.getElementsByClassName('jobtitle');
    r.style.setProperty('--navactivebg', '#ff09d9');
    r.style.setProperty('--sig', 'url("../../images/sig-80s_transbkgd.png")');
    for(const j of jt) {
      j.style.backgroundImage = 'linear-gradient(to right, rgba(255, 9, 217, 1), rgba(234, 255, 0, .5))';
    }
}

// Switch it back to boring
function boring() {
  console.log("Boring Sydney"); // DEBUG:
  let elements = document.querySelectorAll('.rd');
  elements.forEach((elem, i) => {
    elements[i].classList.remove('rda');
  });
  let r = document.querySelector(':root');
  let jt = document.getElementsByClassName('jobtitle');
  r.style.setProperty('--navactivebg', '#fefefe');
  r.style.setProperty('--sig', 'url("../../images/sig-oil640.png")');
  for(const j of jt) {
    j.style.backgroundImage = 'linear-gradient(to right, rgba(19, 128, 161, 1), rgba(19, 128, 161, 0))';
  }
}
