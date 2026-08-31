const ticketTemplates = {
  NBC: {
    key: "nbc",
    page: "tickets/nbc-ticket.html",
  },

  SACTWU: {
    key: "sactwu",
    page: "tickets/sactwu-ticket.html",
  },

  ATASA: {
    key: "atasa",
    page: "tickets/atasa-ticket.html",
  },

  SACMA: {
    key: "sacma",
    page: "tickets/sacma-ticket.html",
  },

  EPCMA: {
    key: "epcma",
    page: "tickets/epcma-ticket.html",
  },

  SAAA: {
    key: "saaa",
    page: "tickets/saaa-ticket.html",
  },

  Other: {
    key: "nbc",
    page: "tickets/nbc-ticket.html",
  },
};

function getTicketTemplate(organisation) {
  return ticketTemplates[organisation] || ticketTemplates.Other;
}
