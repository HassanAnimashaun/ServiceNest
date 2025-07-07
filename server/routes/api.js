const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fetch = require("node-fetch");
const { getDb } = require("../db");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { verifyToken, requireAdmin } = require("../middleware/auth");

// Fetch all vehicle makes
router.get("/makes", async (req, res) => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );

    if (!response.ok) throw new Error("NHTSA API failed");

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch from NHTSA:", err);
    res.status(500).json({ error: "Failed to fetch makes" });
  }
});

// Fetch models for a specific make
router.get("/models/:make", async (req, res) => {
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

// POST /api/reservations (using native MongoDB driver)
router.post("/reservations", async (req, res) => {
  const db = getDb();
  const reservationNumber = `VW-${Date.now()}`;

  const reservation = {
    ...req.body,
    reservationNumber,
    createdAt: new Date(),
  };

  const { insertedId } = await db
    .collection("reservations")
    .insertOne(reservation);
  const saved = await db
    .collection("reservations")
    .findOne({ _id: insertedId });

  res.status(201).json(saved);
});

// GET /api/reservations
router.get("/reservations", async (req, res) => {
  try {
    const db = getDb();
    const reservations = await db
      .collection("reservations")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/login

router.post("/login", async (req, res) => {
  const db = getDb();
  const { username, password } = req.body;

  const user = await db.collection("credentials").findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({ token, message: "Login successful" });
});

router.get("/reservations", verifyToken, requireAdmin, async (req, res) => {
  const db = getDb();
  const reservations = await db.collection("reservations").find().toArray();
  res.json(reservations);
});

module.exports = router;
