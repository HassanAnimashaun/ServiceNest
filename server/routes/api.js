// routes/api.js
const express = require("express");
const router = express.Router();
const { getdb } = require("../db"); // import db accessor

// Fetch all vehicle makes
app.get("/api/makes", async (req, res) => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch makes" });
  }
});

// Fetch models for a specific make
app.get("/api/models/:make", async (req, res) => {
  const { make } = req.params;
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// GET /api/reservations
router.get("/reservations", async (req, res) => {
  let names = [];
  try {
    const db = getdb();
    const reservations = await db
      .collection("reservations")
      .find()
      .sort({ name: 1 })
      .foreach((name) => names.push(name));
    res.status(200).json(names);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/reservations", async (req, res) => {
  try {
    const reservation = await ReservationModel.create(req.body);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Error saving reservation" });
  }
});

module.exports = router;
