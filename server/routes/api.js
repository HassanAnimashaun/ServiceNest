const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { getDb } = require("../db");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const {
  verifyToken,
  requireAdmin,
  requirePlan,
  requireRole,
} = require("../middleware/auth");
const { ObjectId } = require("mongodb");

// Fetch all vehicle makes
router.get("/makes", async (req, res) => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );

    if (!response.ok) {
      console.error(
        "NHTSA /makes failed:",
        response.status,
        response.statusText
      );
      return res.status(502).json({ error: "NHTSA API request failed" });
    }

    const data = await response.json();

    if (!data.Results || !Array.isArray(data.Results)) {
      return res.status(500).json({ error: "Unexpected API format" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Failed to fetch makes from NHTSA:", err.message);
    res.status(500).json({ error: "Failed to fetch makes" });
  }
});

router.get("/models/:make", async (req, res) => {
  const { make } = req.params;

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(
        make
      )}?format=json`
    );

    if (!response.ok) {
      console.error(
        "NHTSA /models failed:",
        response.status,
        response.statusText
      );
      return res.status(502).json({ error: "NHTSA API request failed" });
    }

    const data = await response.json();

    if (!data.Results || !Array.isArray(data.Results)) {
      return res.status(500).json({ error: "Unexpected API format" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Failed to fetch models from NHTSA:", err.message);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// Admin login

router.post("/login", async (req, res) => {
  const db = getDb();
  const { username, password } = req.body;

  const user = await db.collection("credentials").findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const clientId =
    user.clientId ||
    (process.env.NODE_ENV === "development" ? "villinwraps" : null);

  if (!clientId) {
    return res.status(500).json({ error: "No clientId assigned to user" });
  }

  const token = jwt.sign(
    {
      username: user.username,
      role: user.role,
      plan: user.plan || "free",
      clientId: clientId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.status(200).json({ token, message: "Login successful" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(200).json({ message: "Logged out" });
});

router.get("/me", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

// Dashboard

router.get("/dashboard", verifyToken, requireAdmin, (req, res) => {
  res.json({ message: "Welcome to the dashboard ", user: req.user });
});

// Reservation
router.get("/reservations", verifyToken, requireAdmin, async (req, res) => {
  const db = getDb();
  const reservations = await db
    .collection("reservations")
    .find({ clientId: req.user.clientId })
    .toArray();
  res.json(reservations);
});

// Reservation by Id
router.get("/reservations/:id", verifyToken, async (req, res) => {
  const db = getDb();
  const reservationId = req.params.id;

  try {
    const reservation = await db.collection("reservations").findOne({
      _id: new ObjectId(reservationId),
      clientId: req.user.clientId,
    });

    if (!reservation) {
      return res
        .status(404)
        .json({ error: "Reservation not found or unauthorized." });
    }
    res.json(reservation);
  } catch (err) {
    console.error("Error fetching reservation:", err.message);
    res.status(500).json({ error: "Failed to fetch reservation." });
  }
});

module.exports = router;
