import { playAudio } from "./audio.js";

const enterButton = document.getElementById("enterButton");
const buttonHoverSound = document.getElementById("buttonHoverSound");

enterButton.addEventListener("mouseenter", () => {
  playAudio(buttonHoverSound, 0.9);
});

enterButton.addEventListener("click", async () => {
  window.location.href = "pages/countdown.html";
});
