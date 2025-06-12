// routes/api.js
const express = require("express");
const router = express.Router();
const { getdb } = require("../db"); // import db accessor

// GET /api
router.get("/", (req, res) => {
  res.send("hello");
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

module.exports = router;
