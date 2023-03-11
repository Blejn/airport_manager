const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      default: "",
    },
    flightNumber: {
      type: String,
      default: "",
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    departure_time: {
      type: String,
      default: "",
    },
    departure_city: {
      default: "",
    },
    departure_country: {
      type: String,
      default: "",
    },
    destination_time: {
      type: String,
      default: "",
    },
    destination_country: {
      type: String,
      default: "",
    },
    destination_city: {
      type: String,
      default: "",
    },
    seat: {
      type: String,
      default: "",
    },
    payment: { type: Boolean, default: true },
    userId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
