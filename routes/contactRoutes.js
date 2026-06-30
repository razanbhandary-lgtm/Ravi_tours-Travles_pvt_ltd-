const express = require("express");

const router = express.Router();

const contact = require("../controllers/contactController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/auth");

router.post("/", contact.submitContact);

router.get("/", verifyToken, isAdmin, contact.getMessages);

module.exports = router;