const express = require("express");

const router = express.Router();

const flight = require("../controllers/flightController");

router.get("/search", flight.searchFlights);

router.get("/popular", flight.popularFlights);

router.get("/airports", flight.airports);

router.get("/:id", flight.singleFlight);

module.exports = router;