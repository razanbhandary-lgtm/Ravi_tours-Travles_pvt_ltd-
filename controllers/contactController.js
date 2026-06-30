const db = require("../config/db");

// Contact Form Submit
exports.submitContact = async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;

        await db.query(
            `INSERT INTO contact_messages
            (name,email,phone,message)
            VALUES(?,?,?,?)`,
            [
                name,
                email,
                phone,
                message
            ]
        );

        res.json({
            success: true,
            message: "Message sent successfully."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Admin - All Messages
exports.getMessages = async (req, res) => {

    const [rows] = await db.query(
        "SELECT * FROM contact_messages ORDER BY id DESC"
    );

    res.json({
        success: true,
        messages: rows
    });

};