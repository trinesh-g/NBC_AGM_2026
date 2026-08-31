const storedPass = sessionStorage.getItem("nbcGridPass");

if (!storedPass) {
  window.location.href = "../rsvp.html";
} else {
  const passData = JSON.parse(storedPass);

  const attendeeName = document.getElementById("attendeeName");
  const organisation = document.getElementById("organisation");
  const attendance = document.getElementById("attendance");
  const passId = document.getElementById("passId");
  const qrCode = document.getElementById("qrCode");

  if (attendeeName) {
    attendeeName.textContent = passData.name || "GUEST";
  }

  if (organisation) {
    organisation.textContent = passData.organisation || "NBC";
  }

  if (attendance) {
    attendance.textContent = passData.attendance || "ATTENDING";
  }

  if (passId) {
    passId.textContent = passData.passId || "NBC-2026-0000";
  }

  /*
   * Generate QR code
   *
   * The QR contains the unique pass information.
   */

  if (qrCode && typeof QRCode !== "undefined") {
    qrCode.innerHTML = "";

    const qrData = JSON.stringify({
      event: passData.event || "NBC AGM 2026",
      name: passData.name || "",
      organisation: passData.organisation || "",
      attendance: passData.attendance || "",
      passId: passData.passId || "",
    });

    new QRCode(qrCode, {
      text: qrData,
      width: 100,
      height: 100,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
}
