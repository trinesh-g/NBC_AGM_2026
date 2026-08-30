// =====================================================
// CAR DATA
// =====================================================

// This array stores all of the cars in our carousel.
//
// Each object represents ONE car.
//
// name       = Name displayed to the user
// accent     = Accent colour for that car
// label      = Short identifier used for the wallpaper filename
// file       = Main car image
// wallpaper  = Wallpaper image
//
// You can add more information to each car later,
// such as description, team, driver, etc.

const cars = [
  {
    name: "SIGMA // 01",
    accent: "#ef1722",
    label: "01",
    file: "../assets/cars/sacma.png",
    wallpaper: "../assets/wallpapers/apex-01.svg",
  },

  {
    name: "SACTRA // 02",
    accent: "#f0f0f0",
    label: "02",
    file: "../assets/cars/sactwu.png",
    wallpaper: "../assets/wallpapers/volt-02.svg",
  },

  {
    name: "ENVI // 03",
    accent: "#ef1722",
    label: "NBC",
    file: "../assets/cars/nbc.png",
    wallpaper: "../assets/wallpapers/nbc-03.svg",
  },

  {
    name: "ATARA // 04",
    accent: "#4bbdff",
    label: "04",
    file: "../assets/cars/atasa.png",
    wallpaper: "../assets/wallpapers/pulse-04.svg",
  },

  {
    name: "SAERA // 05",
    accent: "#ffd000",
    label: "05",
    file: "../assets/cars/saa.png",
    wallpaper: "../assets/wallpapers/torque-05.svg",
  },
];

// =====================================================
// CURRENTLY SELECTED CAR
// =====================================================

// This tells the carousel which car is currently selected.
//
// Arrays start counting from 0:
//
// 0 = APEX
// 1 = VOLT
// 2 = NBC
// 3 = PULSE
// 4 = TORQUE
//
// Therefore "2" means NBC is selected when the page opens.

let selected = 2;

// =====================================================
// GET OUR HTML ELEMENTS
// =====================================================

// This is the container where JavaScript will put
// all of the car cards.

const carsContainer = document.getElementById("cars");

// This is the container where JavaScript will create
// the little navigation dots.

const carouselDots = document.getElementById("carouselDots");

// =====================================================
// CREATE THE CARDS AND DOTS
// =====================================================

// Go through every car in the cars array.

cars.forEach(function (car, index) {
  // -----------------------------------------------
  // CREATE THE CAR BUTTON
  // -----------------------------------------------

  // Create a button element for this car.

  const carElement = document.createElement("button");

  // Make sure it behaves as a normal button.

  carElement.type = "button";

  // Give it the CSS class used by our carousel.

  carElement.className = "car-card";

  // -----------------------------------------------
  // PUT THE CAR IMAGE INSIDE THE BUTTON
  // -----------------------------------------------

  carElement.innerHTML = `
    <img
      src="${car.file}"
      alt="${car.name}"
    >
  `;

  // -----------------------------------------------
  // WHEN THE CAR IS CLICKED
  // -----------------------------------------------

  // Select this car and then open its information modal.

  carElement.onclick = function () {
    select(index, true);
  };

  // -----------------------------------------------
  // ADD THE CAR TO THE PAGE
  // -----------------------------------------------

  carsContainer.appendChild(carElement);

  // =================================================
  // CREATE THE NAVIGATION DOT
  // =================================================

  const dot = document.createElement("button");

  dot.type = "button";

  // When the dot is clicked,
  // select the corresponding car.

  dot.onclick = function () {
    select(index, true);
  };

  // Add the dot to the dots container.

  carouselDots.appendChild(dot);
});

// =====================================================
// WORK OUT WHERE A CAR IS RELATIVE TO THE SELECTED CAR
// =====================================================

// This function tells us where a particular car sits
// compared to the currently selected car.
//
// Example:
//
// selected = 2
//
// Car 0 = far left
// Car 1 = left
// Car 2 = active
// Car 3 = right
// Car 4 = far right

function getRelativePosition(index) {
  // Work out the difference between this car
  // and the currently selected car.

  let distance = index - selected;

  // Because this is a circular carousel,
  // we need to wrap the positions around.

  if (distance > 2) {
    distance = distance - 5;
  }

  if (distance < -2) {
    distance = distance + 5;
  }

  // Return the final position.

  return distance;
}

// =====================================================
// RENDER THE CAROUSEL
// =====================================================

// This function updates the visual position
// of every car.

function renderCarousel() {
  // Get every car card inside our container.

  const carElements = Array.from(carsContainer.children);

  // Go through every car.

  carElements.forEach(function (carElement, index) {
    // Start by removing all previous position classes.

    carElement.className = "car-card";

    // Find out where this car should be positioned.

    const distance = getRelativePosition(index);

    // -----------------------------------------------
    // ACTIVE CAR
    // -----------------------------------------------

    if (distance === 0) {
      carElement.classList.add("active");
    }

    // -----------------------------------------------
    // CAR TO THE LEFT
    // -----------------------------------------------
    else if (distance === -1) {
      carElement.classList.add("left");
    }

    // -----------------------------------------------
    // CAR TO THE RIGHT
    // -----------------------------------------------
    else if (distance === 1) {
      carElement.classList.add("right");
    }

    // -----------------------------------------------
    // FAR LEFT CAR
    // -----------------------------------------------
    else if (distance === -2) {
      carElement.classList.add("far-left");
    }

    // -----------------------------------------------
    // FAR RIGHT CAR
    // -----------------------------------------------
    else if (distance === 2) {
      carElement.classList.add("far-right");
    }

    // -----------------------------------------------
    // ANYTHING ELSE
    // -----------------------------------------------
    else {
      carElement.classList.add("hidden");
    }
  });

  // =================================================
  // UPDATE THE NAVIGATION DOTS
  // =================================================

  const dots = Array.from(carouselDots.children);

  dots.forEach(function (dot, index) {
    // Remove the active state first.

    dot.classList.remove("active");

    // If this dot belongs to the selected car,
    // make it active.

    if (index === selected) {
      dot.classList.add("active");
    }
  });

  // =================================================
  // UPDATE THE CAR INFORMATION
  // =================================================

  const selectedCar = cars[selected];

  // Put the selected car's name into the heading.

  document.getElementById("carName").textContent = selectedCar.name;

  // Put the selected car's description into the description.

  document.getElementById("carDescription").textContent = selectedCar.description;
}

// =====================================================
// SELECT A CAR
// =====================================================

// This function changes which car is selected.
//
// index = which car we want
//
// openModal = whether we should open the car information
//             modal after selecting it.

function selectCar(index, openModal) {
  // Keep the carousel circular.
  //
  // If we go before 0, it wraps to the last car.
  // If we go beyond the last car, it wraps to the first.

  selected = (index + 5) % 5;

  // Update the visual carousel.

  renderCarousel();

  // If we were told to open the modal,
  // wait 180 milliseconds and then open it.

  if (openModal === true) {
    setTimeout(function () {
      openCarModal();
    }, 180);
  }
}

// =====================================================
// OPEN CAR MODAL
// =====================================================

function openCarModal() {
  // Get the currently selected car.

  const selectedCar = cars[selected];

  // Put the car image into the modal.

  document.getElementById("modalCarArt").innerHTML = `
    <img
      src="${selectedCar.file}"
      alt="${selectedCar.name}"
    >
  `;

  // Put the car name into the modal.

  document.getElementById("modalCarName").textContent = selectedCar.name;

  // Put the description into the modal.

  document.getElementById("modalCarDescription").textContent = selectedCar.description;

  // Store the wallpaper filename on the download button.

  document.getElementById("modalWallpaper").dataset.file = selectedCar.wallpaper;

  // Store the short car name for the download filename.

  document.getElementById("modalWallpaper").dataset.name = selectedCar.label;

  // Show the modal.

  document.getElementById("carModal").classList.add("open");

  // Tell accessibility tools that the modal is now visible.

  document.getElementById("carModal").setAttribute("aria-hidden", "false");
}

// =====================================================
// CLOSE CAR MODAL
// =====================================================

function closeCarModal() {
  // Hide the modal.

  document.getElementById("carModal").classList.remove("open");

  // Tell accessibility tools that the modal is hidden.

  document.getElementById("carModal").setAttribute("aria-hidden", "true");
}

// =====================================================
// PREVIOUS CAR BUTTON
// =====================================================

// Clicking the left arrow moves one car backwards.

document.getElementById("prevCar").onclick = function () {
  selectCar(selected - 1, false);
};

// =====================================================
// NEXT CAR BUTTON
// =====================================================

// Clicking the right arrow moves one car forwards.

document.getElementById("nextCar").onclick = function () {
  selectCar(selected + 1, false);
};

// =====================================================
// VIEW WALLPAPER BUTTON
// =====================================================

// Clicking "VIEW WALLPAPER" opens the modal.

document.getElementById("wallpaperButton").onclick = function () {
  openCarModal();
};

// =====================================================
// CLOSE BUTTON
// =====================================================

document.getElementById("modalClose").onclick = function () {
  closeCarModal();
};

// =====================================================
// CLICK BACKDROP TO CLOSE
// =====================================================

document.querySelector("[data-close-modal]").onclick = function () {
  closeCarModal();
};

// =====================================================
// DOWNLOAD WALLPAPER
// =====================================================

document.getElementById("modalWallpaper").onclick = function () {
  // Create a temporary link.

  const downloadLink = document.createElement("a");

  // Get the wallpaper path stored earlier.

  downloadLink.href = document.getElementById("modalWallpaper").dataset.file;

  // Create the filename for the downloaded wallpaper.

  downloadLink.download = "NBC-AGM-2026-" + document.getElementById("modalWallpaper").dataset.name + ".svg";

  // Trigger the download.

  downloadLink.click();
};

// =====================================================
// KEYBOARD CONTROLS
// =====================================================

document.onkeydown = function (event) {
  // Escape closes the modal.

  if (event.key === "Escape") {
    closeCarModal();
  }

  // Left arrow moves to the previous car.

  if (event.key === "ArrowLeft") {
    selectCar(selected - 1, false);
  }

  // Right arrow moves to the next car.

  if (event.key === "ArrowRight") {
    selectCar(selected + 1, false);
  }
};

// =====================================================
// INITIAL RENDER
// =====================================================

// Run this once when the page loads
// so the carousel starts in the correct position.

renderCarousel();

// =====================================================
// AUTO CAROUSEL
// =====================================================

let autoSlideTimer;
let carouselPaused = false;

function startAutoSlide() {
  clearInterval(autoSlideTimer);

  autoSlideTimer = setInterval(function () {
    if (!carouselPaused) {
      selectCar(selected + 1, false);
    }
  }, 5000);
}

carsContainer.addEventListener("mouseenter", function () {
  carouselPaused = true;
});

carsContainer.addEventListener("mouseleave", function () {
  carouselPaused = false;
});

startAutoSlide();
