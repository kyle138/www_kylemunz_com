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
    let jt = document.getElementsByClassName('jobtitle');
    if(rdclicks%6 == 0) {
      r.style.setProperty('--navactivebg', '#fefefe');
      r.style.setProperty('--sig', 'url("../../images/sig-oil640.png")');
      for(const j of jt) {
        j.style.backgroundImage = 'linear-gradient(to right, rgba(19, 128, 161, 1), rgba(19, 128, 161, 0))';
      }
    } else {
      r.style.setProperty('--navactivebg', '#ff09d9');
      r.style.setProperty('--sig', 'url("../../images/sig-80s_transbkgd.png")');
      for(const j of jt) {
        j.style.backgroundImage = 'linear-gradient(to right, rgba(255, 9, 217, 1), rgba(234, 255, 0, .5))';
      }
    }
  }
}
