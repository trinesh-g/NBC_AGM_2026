import { playAudio } from "./audio.js";

const enterButton = document.getElementById("enterButton");
const buttonHoverSound = document.getElementById("buttonHoverSound");

const countdown = document.getElementById("countdown");

const entry = document.getElementById("entry");
const startSequence = document.getElementById("startSequence");

const sequenceNumber = document.getElementById("number");
const sequenceStatus = document.getElementById("status");

const lightsOut = document.getElementById("lightsOut");
const speedWipe = document.getElementById("wipe");

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

// ========================================
// ENTER BUTTON HOVER SOUND
// ========================================

enterButton.addEventListener("mouseenter", () => {
  buttonHoverSound.currentTime = 0;

  //buttonHoverSound.volume = 0.25;

  // buttonHoverSound.play().catch(() => {});
  playAudio(buttonHoverSound, 0.9);
});

enterButton.addEventListener("click", async () => {
  // Hide the opening button
  entry.classList.add("hide");

  // Show the starting sequence
  startSequence.classList.add("active");

  // ========================================
  // ENGINE START
  // ========================================

  setTimeout(() => {
    playAudio(countdown, 0.38);
  }, 900);

  // ========================================
  // START LIGHTS
  // ========================================

  const startLights = [...document.querySelectorAll(".lights i")];

  // Turn on each light
  for (let lightIndex = 0; lightIndex < startLights.length; lightIndex++) {
    await wait(980);

    sequenceNumber.textContent = "0" + (startLights.length - lightIndex - 1);

    startLights[lightIndex].classList.add("on");
  }

  // ========================================
  // HOLD
  // ========================================

  //sequenceNumber.textContent = "00";

  sequenceStatus.textContent = "HOLD";

  await wait(750);

  // ========================================
  // LIGHTS OUT
  // ========================================

  startLights.forEach((light) => {
    light.classList.remove("on");
  });

  sequenceStatus.textContent = "LIGHTS OUT";

  startSequence.classList.add("fade-out");

  lightsOut.classList.add("show");

  speedWipe.classList.add("fire");

  document.body.classList.add("transitioning");

  setTimeout(() => {
    window.location.href = "pages/grid.html";
  }, 650);
});
