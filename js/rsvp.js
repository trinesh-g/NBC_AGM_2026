import { playAudio } from "./audio.js";

const rsvpForm = document.getElementById("rsvpForm");
const formContent = document.getElementById("formContent");
const success = document.getElementById("success");
const viewGridPass = document.getElementById("viewGridPass");
const backToForm = document.getElementById("backToForm");
const mainMusic = document.getElementById("mainMusic");

playAudio(mainMusic, 0.8);

// Employer Body → Ticket Page
const ticketTemplates = {
  NBC: "/pages/tickets/nbc-ticket.html",
  SACTWU: "/pages/tickets/sactwu-ticket.html",
  ATASA: "/pages/tickets/atasa-ticket.html",
  SACMA: "/pages/tickets/sacma-ticket.html",
  EPCMA: "/pages/tickets/epcma-ticket.html",
  SAAA: "/pages/tickets/saaa-ticket.html",
  Other: "/pages/tickets/nbc-ticket.html",
};

function generatePassId() {
  const year = "2026";
  const random = Math.floor(1000 + Math.random() * 9000);

  return `NBC-${year}-${random}`;
}

function getTicketTemplate(organisation) {
  return ticketTemplates[organisation] || ticketTemplates.Other;
}

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(rsvpForm);

  const organisation = String(formData.get("organisation") || "").trim();

  const passData = {
    name: String(formData.get("name") || "").trim(),
    organisation,
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    attendance: String(formData.get("attendance") || "").trim(),

    passId: generatePassId(),

    event: "NBC AGM 2026",
    venue: "The Maslow Hotel, Sandton",
    date: "28 October 2026",
    time: "10:00 - 11:30",
  };

  // Save the attendee information.
  sessionStorage.setItem("nbcGridPass", JSON.stringify(passData));

  // Show confirmation.
  formContent.style.display = "none";
  success.classList.add("show");
});

// Open the correct ticket page.
viewGridPass.addEventListener("click", () => {
  const storedPass = sessionStorage.getItem("nbcGridPass");

  if (!storedPass) {
    return;
  }

  const passData = JSON.parse(storedPass);

  const ticketPage = getTicketTemplate(passData.organisation);

  window.location.href = ticketPage;
});

// Allow the user to edit their response.
backToForm.addEventListener("click", () => {
  success.classList.remove("show");

  formContent.style.display = "block";
});
