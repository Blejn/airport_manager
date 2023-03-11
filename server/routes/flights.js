const express = require("express");
const router = express.Router();
const Flight = require("../models/Flight");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", jsonParser, async (req, res) => {
  try {
    Flight.find({}).then(function (flights) {
      res.status(200).json(flights);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/createFlight", jsonParser, async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const flight = await newFlight.save();
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id", jsonParser, async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
