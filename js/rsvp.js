document.getElementById("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.currentTarget.style.display = "none";
  document.getElementById("success").classList.add("show");
});
