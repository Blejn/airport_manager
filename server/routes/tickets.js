const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const bodyParser = require("body-parser");
const User = require("../models/User");
const jsonParser = bodyParser.json();

router.post("/createTicket", jsonParser, async (req, res) => {
  try {
    const newTicket = new Ticket({
      ticketNumber: req.body.ticketNumber,
      flightNumber: req.body.flightNumber,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      departure_time: req.body.departure_time,
      departure_country: req.body.departure_country,
      departure_city: req.body.departure_city,
      destination_time: req.body.destination_time,
      destination_country: req.body.destination_country,
      destination_city: req.body.destination_city,
      pin: req.body.pin,
      seat: req.body.seat,
      payment: req.body.payment,
      userId: req.body.userId,
    });
    const ticket = await newTicket.save();
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    Ticket.find({}).then(function (tickets) {
      res.status(200).json(tickets);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id/myTickets", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const tickets = await Ticket.find({ userId: currentUser._id });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/:userId/tickets", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const ticketsUser = await Promise.all(
      currentUser.tickets.map(ticketNumber => {
        return Ticket.find({ ticketNumber: ticketNumber });
      })
    );
    res.status(200).json(ticketsUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
