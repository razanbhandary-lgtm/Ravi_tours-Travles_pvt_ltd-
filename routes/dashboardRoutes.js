const express = require("express");

const router = express.Router();

const dashboard = require("../controllers/dashboardController");

const {
    verifyToken,
    isAdmin
} = require("../middleware/auth");

router.get("/", verifyToken, isAdmin, dashboard.dashboard);

module.exports = router;