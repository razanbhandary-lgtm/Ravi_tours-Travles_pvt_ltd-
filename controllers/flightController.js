const db = require("../config/db");

// Search Flights
exports.searchFlights = async (req, res) => {
    try {
        const { from, to, date } = req.query;

        const [rows] = await db.query(
            `SELECT * FROM flights
             WHERE from_city=? AND to_city=? AND DATE(departure)=?`,
            [from, to, date]
        );

        res.json({
            success: true,
            flights: rows
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Popular Routes
exports.popularFlights = async (req, res) => {
    try {

        const [rows] = await db.query(
            "SELECT * FROM flights ORDER BY price ASC LIMIT 8"
        );

        res.json({
            success: true,
            flights: rows
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Airports
exports.airports = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM airports ORDER BY city ASC"
    );

    res.json({
        success: true,
        airports: rows
    });

};

// Flight Detail
exports.singleFlight = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM flights WHERE id=?",
        [req.params.id]
    );

    if (rows.length === 0) {

        return res.status(404).json({
            success: false,
            message: "Flight Not Found"
        });

    }

    res.json({
        success: true,
        flight: rows[0]
    });

};