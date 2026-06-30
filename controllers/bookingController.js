const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Create Booking
exports.createBooking = async (req, res) => {
    try {

        const {
            full_name,
            phone,
            email,
            route_label,
            trip_type,
            departure_date,
            passengers
        } = req.body;

        const request_id = "RTT-" + uuidv4().slice(0, 8).toUpperCase();

        await db.query(
            `INSERT INTO bookings
            (request_id,user_id,full_name,phone,email,route_label,trip_type,departure_date,passengers)
            VALUES(?,?,?,?,?,?,?,?,?)`,
            [
                request_id,
                req.user?.id || null,
                full_name,
                phone,
                email,
                route_label,
                trip_type,
                departure_date,
                passengers
            ]
        );

        res.json({
            success: true,
            booking: {
                request_id,
                full_name,
                route_label,
                status: "pending"
            }
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Track Booking
exports.trackBooking = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM bookings WHERE request_id=?",
        [req.params.request_id]
    );

    if (rows.length == 0) {

        return res.status(404).json({
            success: false,
            message: "Booking Not Found"
        });

    }

    res.json({
        success: true,
        booking: rows[0]
    });

};

// User Bookings
exports.myBookings = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM bookings WHERE user_id=? ORDER BY id DESC",
        [req.user.id]
    );

    res.json({
        success: true,
        bookings: rows
    });

};

// Admin All Bookings
exports.allBookings = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM bookings ORDER BY id DESC"
    );

    res.json({
        success: true,
        bookings: rows
    });

};

// Update Status
exports.updateStatus = async (req, res) => {

    await db.query(
        "UPDATE bookings SET status=? WHERE id=?",
        [
            req.body.status,
            req.params.id
        ]
    );

    res.json({
        success: true,
        message: "Status Updated"
    });

};