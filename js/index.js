import { playAudio } from "./audio.js";

const enterButton = document.getElementById("enterButton");
const buttonClickSound = document.getElementById("buttonClickSound");

enterButton.addEventListener("click", async () => {
  playAudio(buttonClickSound, 0.2);
  await new Promise((resolve) => setTimeout(resolve, 600));
  window.location.href = "pages/countdown.html";
});
