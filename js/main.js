import { fadeAudio, playAudio } from "./audio.js";

const mainLoadSound = document.getElementById("mainLoading");
const mainMusic = document.getElementById("mainMusic");

window.addEventListener("load", () => {
  const site = document.querySelector(".site");

  site.classList.add("is-live");
});

mainLoadSound.currentTime = 3;

playAudio(mainLoadSound, 0.1);

fadeAudio(mainLoadSound, 0.9, 2500);

setTimeout(() => {
  playAudio(mainMusic, 0.9);
}, 2500);
