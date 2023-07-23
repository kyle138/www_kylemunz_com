document.addEventListener("DOMContentLoaded", () => {

  // Get the elements
  const contactBtn = document.getElementById("contactme-btn");
  const contactFrm = document.getElementById("contact");

  // delay
  const delay = ms => new Promise(res => setTimeout(res, ms)); 

  // Intercept button clicks
  contactBtn.addEventListener("click", async () => {

    // Wait for form to expand
    await delay(1138);

    // Scroll to contact form
    window.scrollTo({
      left: 0,
      top: contactFrm.offsetTop,
      behavior: "smooth" 
    });

  }); // End contactBtn.addEventListener
}); // End DOMContentLoaded