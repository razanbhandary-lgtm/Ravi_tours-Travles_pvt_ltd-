const db = require("../config/db");

exports.dashboard = async (req, res) => {

    const [[users]] = await db.query(
        "SELECT COUNT(*) total FROM users"
    );

    const [[bookings]] = await db.query(
        "SELECT COUNT(*) total FROM bookings"
    );

    const [[messages]] = await db.query(
        "SELECT COUNT(*) total FROM contact_messages"
    );

    const [[flights]] = await db.query(
        "SELECT COUNT(*) total FROM flights"
    );

    res.json({
        success: true,
        dashboard: {
            users: users.total,
            bookings: bookings.total,
            messages: messages.total,
            flights: flights.total
        }
    });

};