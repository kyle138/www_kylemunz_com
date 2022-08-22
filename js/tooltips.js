// Load the tooltips
document.addEventListener("DOMContentLoaded", () => {
  const tts = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  .map((tt) => {
    // console.log(tt);  // DEBUG: 
    return new bootstrap.Tooltip(tt);
  });
})
