'use strict';

// Initial variables
var dBGC,
    dCLR, // Directional arrays for BGC and CLR
    elements = [];

/*
* Identifies all elements containing both 'acidd' and the supplied prefix classes.
* Returns array of unique 'prefix*' classes being used.
@prefix {string} - typically 'bgc-' or 'clr-'
*/
function getElems(prefix) {
  // Identify all elements with 'acidd' class and the supplied prefix* class.
  let ELEMs = document.querySelectorAll(`.acidd[class*='${prefix}']`);
  // Get array of unique prefix* classes being used.
  let obj = {},
      reggie = new RegExp(`^${prefix}\\d+$`);
  for(var i=0;i<ELEMs.length;i++) {
    ELEMs[i].classList.forEach((cls) => {
      if(reggie.test(cls) && !obj.hasOwnProperty(cls)) {
        obj[cls] = [1,1,1];
      }
    }); // End elems.forEach
  } // End elems for loop
  return obj;
} // End getElems

/*
* Gets the backgroundColor for the first element of the selected class.
* If the backgroundColor isn't set, check the parent elements all the way up.
* If no backgroundColor is set all the way up to HTML element, set to 255,255,255.
* @cls {string} class to get background color for. eg: bgc-0 bgc-1 bgc-2 etc
* Sets elements['bgr'][cls] with array of R,G,B values and sets the delta direction value to 1 initially.
*/
function getbgcRGB(cls) {
  return new Promise((res) => {
    let rgb =  window.getComputedStyle(document.querySelector(`.${cls}`),null).backgroundColor;
    if(rgb == 'rgba(0, 0, 0, 0)') {
      // Ugh, it's not set, so check its parents.
      let elem = document.querySelector(`.${cls}`);

      do {
        elem=elem.parentElement;
        if(elem.nodeName == 'HTML') {
          // We made it all the way to the HTML element with no background color set. Just return white.
          rgb = 'rgb(255, 255, 255)';
        } else {
          rgb = window.getComputedStyle(elem).backgroundColor;
        }
      } while (rgb == 'rgba(0, 0, 0, 0)')
    }
    // The selected element has a color set, convert RGB values to array of numbers and return it.
    elements['bgc'][cls] = rgb.split('(')[1].split(')')[0].split(', ').map(x => [parseInt(x),1]);
    return res();
  }); // End Promise
} // End getbgcRGB

/*
* Gets the color for the first element of the selected class.
* @cls {string} class to get background color for. eg: bgc-0 bgc-1 bgc-2 etc
* Sets elements['clr'][cls] with array of R,G,B values and sets the delta direction value to 1 initially.
*/
function getclrRGB(cls) {
  return new Promise((res) => {
    elements['clr'][cls] = window.getComputedStyle(document.querySelector(`.${cls}`),null).color.split('(')[1].split(')')[0].split(', ').map(x => [parseInt(x),1]);
    return res();
  });
} // End getclrRGB

/*
* Reckons a random delta to all clr and bgc RGB values in the element array.
*/
function acidd() {
  console.log('acidd!');  // DEBUG:
  Object.keys(elements['bgc']).forEach((elem) => {
    console.log(`elem: ${elem}`); // DEBUG:

    // Randomize and add a delta to all 3 RGB values.
    for(let i = 0; i<3;i++) {
      elements['bgc'][elem][i][0] += (elements['bgc'][elem][i][1]*Math.floor(Math.random()*3));
      // Check if we're below the lower boundary
      if(elements['bgc'][elem][i][0] < 0) {
        elements['bgc'][elem][i][1] *= -1;  // Change the directional
        elements['bgc'][elem][i][0] = 6;  // Move away from the boundary
      }
      // Check if we're above the upper boundary
      if(elements['bgc'][elem][i][0] > 255) {
        elements['bgc'][elem][i][1] *= -1;  // Change the directional
        elements['bgc'][elem][i][0] = 249; // Move away from the boundary
      }
    }

    // Assign the new values to elements with the selected class
    document.querySelectorAll(`.${elem}`).forEach((ment) => {
      console.log(elements['bgc']);
      ment.style.backgroundColor = `rgb(${elements['bgc'][elem][0][0]},${elements['bgc'][elem][1][0]},${elements['bgc'][elem][2][0]})`;
      console.log(`background: ${ment.style.backgroundColor}`); // DEBUG:
    })
  }); // End bgc.forEach

  window.setTimeout(acidd,333);	//Play it again Sam
} // End acidd


//**************
// Main Function
document.addEventListener("DOMContentLoaded", () => {

  // Only execute if any elements have 'acidd' class.
  if(document.getElementsByClassName('acidd').length > 0) {

    // Identify all elements with 'acidd' class and bgc-* or clr-* class.
    elements['bgc'] = getElems('bgc-');
    console.log(elements['bgc']);  // DEBUG:
    elements['clr'] = getElems('clr-');
    console.log(elements['clr']); // DEBUG:

    // Only continue if we have any bgc-* or clr-* classes
    if(Object.keys(elements['bgc']).length+Object.keys(elements['clr']).length > 0) {

      // Retrieve initial BGC and CLR values
      Promise.all(  // I make no promises that this is correct.
        [Object.keys(elements['bgc']).map((elem) => {
          getbgcRGB(elem);
          console.log(elem);  // DEBUG:
          console.log(elements['bgc'][elem]); // DEBUG:
        }),  // End map
        Object.keys(elements['clr']).map((elem) => {
          getclrRGB(elem);
          console.log(elem);  // DEBUG:
          console.log(elements['clr'][elem]); // DEBUG:
        })]  // End map
      ) // End Promise.all
      .then(() => {
        console.log('then');  // DEBUG:
        console.log(elements); // DEBUG:
        // acidd();   //********************ARM/DISARM
      });  // End Promise.all.then

    } // End if bgc + clr
  } // End if .acidd
}); // end addEventListener
