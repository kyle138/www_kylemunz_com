document.addEventListener("DOMContentLoaded", () => {

  // Get the elements
  const contactBtn = document.getElementById("contactme-btn");
  const contactFrm = document.getElementById("contact");

  // Intercept button clicks
  contactBtn.addEventListener("click", () => {
    // Scroll to contact form
    window.scrollTo({
      left: 0,
      top: contactFrm.offsetTop,
      behavior: "smooth" 
    });
  });

});