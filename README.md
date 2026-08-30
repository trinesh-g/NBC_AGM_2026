NBC AGM 2026 — SPLIT PROJECT

index.html
  Cinematic opening. Full viewport, no scroll.

pages/grid.html
  Main grid experience and five-car carousel.

pages/event.html
  Separate event information screen.

pages/rsvp.html
  Separate RSVP screen.

css/
  One stylesheet per page.

js/
  One logic file per experience.

assets/
  Audio, car artwork and wallpapers.

FLOW
Opening → Grid → Car profile / Event → RSVP

All primary pages use 100vw/100vh and overflow:hidden.
The RSVP is currently front-end only; connect js/rsvp.js to the chosen submission endpoint.
