'use strict';

// Initial variables
var dBGC,
    dCLR; // Directional arrays for BGC and CLR

/*
* Identifies all elements containing both 'acidd' and the supplied prefix classes.
* Returns array of unique 'prefix*' classes being used.
@prefix {string} - typically 'bgc-' or 'clr-'
*/
function getElems(prefix) {
  // Identify all elements with 'acidd' class and the supplied prefix* class.
  let ELEMs = document.querySelectorAll(`.acidd[class*='${prefix}']`);
  // Get array of unique prefix* classes being used.
  let arr = [],
      reggie = new RegExp(`^${prefix}\\d+$`);
  for(var i=0;i<ELEMs.length;i++) {
    ELEMs[i].classList.forEach((cls) => {
      if(reggie.test(cls) && arr.indexOf(cls) === -1) {
        arr.push(cls);
      }
    }); // End elems.forEach
  } // End elems for loop
  return arr;
} // End getElems

function getRGBs(cls) {

}

// Main Function
document.addEventListener("DOMContentLoaded", () => {

  // Only execute if any elements have 'acidd' class.
  if(document.getElementsByClassName('acidd').length > 0) {

    var elements=[];
    // Identify all elements with 'acidd' class and bgc-* or clr-* class.
    elements['bgc'] = getElems('bgc-');
    console.log(elements['bgc']);  // DEBUG:
    elements['clr'] = getElems('clr-');
    console.log(elements['clr']); // DEBUG:

    // Only continue if we have any bgc-* or clr-* classes
    if(elements['bgc'].length+elements['clr'].length > 0) {
      console.log('acidd!');  // DEBUG:
      // Assign initial BGC and CLR values
      console.log(window.getComputedStyle(document.querySelector(`.${elements['bgc'][0]}`),null).backgroundColor);  //************ substr and split 
      // *************  Call a promise function here ***************

    } // End if bgc + clr
  } // End if .acidd
}); // end addEventListener
