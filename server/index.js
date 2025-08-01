require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const reservationRoutes = require("./routes/reservations");
const { connectToDb } = require("./db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://villinwraps.vercel.app",
        "https://servicenest.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/api/reservations", reservationRoutes);
app.use("/api", apiRoutes);

connectToDb((err) => {
  if (!err) {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error("Failed to connect to MongoDB:", err);
  }
});
