require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ravi Tour & Travels Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});