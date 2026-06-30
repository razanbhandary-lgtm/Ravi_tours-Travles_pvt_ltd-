const express = require("express");

const router = express.Router();

const booking = require("../controllers/bookingController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/auth");

router.post("/", booking.createBooking);

router.get("/track/:request_id", booking.trackBooking);

router.get("/my", verifyToken, booking.myBookings);

router.get("/", verifyToken, isAdmin, booking.allBookings);

router.patch("/:id/status", verifyToken, isAdmin, booking.updateStatus);

module.exports = router;