/**
 * NBC AGM 2026 Countdown Sequence
 *
 * Controls the starting-light countdown, "LIGHTS OUT" animation,
 * screen wipe, and transition to the AGM experience.
 */

const startSequence = document.getElementById("startSequence");
const lights = document.querySelectorAll(".lights i");
const number = document.getElementById("number");
const status = document.getElementById("status");
const lightsOut = document.getElementById("lightsOut");
const wipe = document.getElementById("wipe");

const countdownSteps = [
  {
    number: "3",
    status: "CALIBRATING GRID",
  },
  {
    number: "2",
    status: "FINAL CHECKS",
  },
  {
    number: "1",
    status: "READY",
  },
];

/**
 * Delays execution for the specified number of milliseconds.
 *
 * @param {number} milliseconds - Duration of the delay.
 * @returns {Promise<void>}
 */
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Activates a starting light.
 *
 * @param {number} index - Index of the light to activate.
 */
function activateLight(index) {
  if (lights[index]) {
    lights[index].classList.add("on");
  }
}

/**
 * Runs the countdown sequence.
 *
 * @returns {Promise<void>}
 */
async function runCountdown() {
  startSequence.classList.add("active");

  for (let index = 0; index < countdownSteps.length; index++) {
    const step = countdownSteps[index];

    number.textContent = step.number;
    status.textContent = step.status;

    activateLight(index);

    await wait(900);
  }
}

/**
 * Displays the "LIGHTS OUT" message and starts its animation.
 *
 * @returns {Promise<void>}
 */
async function showLightsOut() {
  startSequence.classList.add("fade-out");

  await wait(100);

  lightsOut.classList.add("show");

  await wait(2000);
}

/**
 * Fires the screen wipe and moves to the AGM experience.
 *
 * @returns {Promise<void>}
 */
async function transitionToExperience() {
  wipe.classList.add("fire");

  await wait(750);

  window.location.href = "../pages/grid.html";
}

/**
 * Starts the complete countdown experience.
 *
 * @returns {Promise<void>}
 */
async function startExperience() {
  await runCountdown();
  await showLightsOut();
  await transitionToExperience();
}

startExperience();
