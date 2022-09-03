// Retrieve QSA links for all downloads
document.addEventListener("DOMContentLoaded", () => {

  // Set defaults
  const url = "https://nf99b8wk5k.execute-api.us-west-2.amazonaws.com/V1/getqsafromcode/";

  // Get the pwd elements
  const pchkbtn = document.getElementById("passwordchk");
  const pwdtxt = document.getElementById("passwordtxt");
  const pwdmsg = document.getElementById("passwordmsg");

  // Intercept password button clicks
  pchkbtn.addEventListener("click", () => {
    getQSA(pwdtxt?.value);
  });

  // Intercept 'ENTER' key in passwordtxt field
  pwdtxt.addEventListener("keyup", (e) => {
    if(e.keyCode === 13) getQSA(pwdtxt?.value);
  });

  // Use password to get signed QSA links
  function getQSA(pwd) {
    if (pwd) {
      vdtPswd();
      // Get QSA for all .downloadlink elements
      const dlls = [].slice.call(document.querySelectorAll('.downloadlink'))
      .map(async (dll) => {
        // Convert password to lowercase and strip any whitespace.
        // It's not very secure, but this doesn't need to be very secure.
        // I would NOT recommend doing this for account logins.
        pwd = pwd.toLowerCase().trim().replace(/ /g,'');
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            "passcode": pwd,
            "hrefurl": dll.href
          })
        })  // End fetch
        .then(async (res) => {
          if(res.ok) {
            return await res.json();
          } else {
            let reserr = await res.json();
            console.error('res is not ok:',reserr); // DEBUG:
            throw reserr.response;
          } //Fetch went ok
        })  // End fetch.then
        .then((data) => {
          if (data.errorMessage) {
            console.error('data.errorMessage'); // DEBUG:
            throw data.errorMessage;
          } else {
            corPswd();
            enDll(
              {
                'dll': dll.id,
                'qsa':  data
              }
            );
            return;
          }
        })  // End fetch.then.then
        .catch((err) => {
          console.error('fetch catch: ',err); // DEBUG:
          if (err == 'Incorrect Passcode') {
            incPswd();
          } else {
            errMsg();
          }
        }); // End Fetch.catch
      }); // End map
    } // End if pwd
  } // End getQSA

  // Validating password
  function vdtPswd() {
    pwdtxt.value = "";
    pwdmsg.innerHTML = "Validating password...";
    pwdmsg.classList.remove("alert-danger", "alert-success");
    pwdmsg.classList.add("alert-info");
  }

  // Password provided doesn't check out
  function incPswd() {
    pwdmsg.innerHTML = "The password you entered is incorrect...";
    pwdmsg.classList.remove("alert-info", "alert-success");
    pwdmsg.classList.add("alert-danger");
  } // End incPswd

  // Password provided is correct
  function corPswd() {
    pwdmsg.innerHTML = "Password checks out, please use the download button below.";
    pwdmsg.classList.remove("alert-danger", "alert-info");
    pwdmsg.classList.add("alert-success");
  } // End corPswd

  // General error message
  function errMsg() {
    pwdmsg.innerHTML = "Sorry, I am experiencing technical difficulties, please try again later.";
    pwdmsg.classList.remove("alert-info", "alert-success");
    pwdmsg.classList.add("alert-danger");
  } // End incPswd

  // Clear all messages
  function clearMsg() {
    pwdmsg.innerHTML = '';
    pwdmsg.classList.remove("alert-info", "alert-success", "alert-danger", "alert-warning");
  } // End clearMsg

  // Enable download link with QSA
  function enDll(obj) {
    if(obj?.dll.length < 1 || obj?.qsa.length < 1) {
      errMsg();
    } else {
      console.log('dll', obj.dll);  // DEBUG:
      console.log('qsa', obj.qsa);  // DEBUG:
      bootstrap.Tooltip.getInstance('#downloadanchorwrapper').disable();
      let dl = document.getElementById(obj.dll)
      dl.href = obj.qsa;
      dl.classList.remove("disabled");
      dl.classList.replace("btn-outline-secondary","btn-success");
      dl.setAttribute('aria-disabled', "false");
      dllTmrSet(obj.dll);
    }
  } // End enDownload

  // Disable the download link
  function disDll(dll) {
    if(dll) {
      let dl = document.getElementById(dll);
      dl.href = dl.href.split("?")[0];
      dl.classList.add("disabled");
      dl.classList.replace("btn-success","btn-outline-secondary");
      dl.setAttribute('aria-disabled', "true");
      pwdmsg.innerHTML = "Download has expired.";
      pwdmsg.classList.remove("alert-info", "alert-success", "alert-danger", "alert-warning");
      pwdmsg.classList.add("alert-warning");
      bootstrap.Tooltip.getInstance('#downloadanchorwrapper').enable();
      tmoTmr();
    }
  } // End disDll

  // Set timer to disable the download link
  function dllTmrSet(dll) {
    console.log('Download link will disable in 10 minutes.');  // DEBUG:
    let expiry = Math.floor(new Date(Date.now()+600000));
    localStorage.setItem(`dll_expire_${dll}`, expiry);
    dllTmr(dll);
  } // End dllTmrSet

  // Timer to disable the download link
  function dllTmr(dll) {
    setTimeout(() => {
      if(new Date(Date.now()) > localStorage.getItem(`dll_expire_${dll}`)) {
        console.log('Timeout'); // DEBUG:
        localStorage.removeItem(`dll_expire_${dll}`);
        disDll(dll)
      } else {
        // Not expired yet, check again in a sec
        dllTmr(dll);
      }
    }, 1000);
  } // End dllTmr

  // Timeout timer, clears all messages.
  function tmoTmr() {
    setTimeout(clearMsg, 1*60*1000);
  } // End tmoTmr

});
