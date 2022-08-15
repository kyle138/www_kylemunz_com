'use strict';
var rdclicks = 0;

document.getElementById('joystick').onclick = () => {
  rdclicks++;
  if(rdclicks%3 == 0) {
    console.log("Give 'em the ole razzle-dazzle"); // DEBUG:
    let elements = document.querySelectorAll('.rd');
    elements.forEach((elem, i) => {
      elements[i].classList.toggle('rda');
    });
    let r = document.querySelector(':root');
    // let sig = document.querySelector('#objBody::before');
    if(rdclicks%6 == 0) {
      r.style.setProperty('--navactivebg', '#fefefe');
      r.style.setProperty('--sig', 'url("../../images/sig-oil640.png")');
    } else {
      r.style.setProperty('--navactivebg', '#ff09d9');
      r.style.setProperty('--sig', 'url("../../images/sig-80s_transbkgd.png")');
    }
  }
}
