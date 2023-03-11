const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    passengers: {
      type: Array,
      default: [],
    },
    departure_time: {
      type: Date,
      default: Date.UTC(2023, 1, 1, 00, 00, 00, 00),
      required: true,
    },
    departure_city: {
      type: String,
      default: "",
      required: true,
    },
    departure_country: {
      type: String,
      default: "",
      required: true,
    },
    destination_time: {
      type: Date,
      default: Date.UTC(2023, 1, 1, 00, 00, 00, 00),
      required: true,
    },
    destination_country: {
      type: String,
      default: "",
      required: true,
    },
    destination_city: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
