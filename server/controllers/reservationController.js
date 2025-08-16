const { getDb } = require("../db");
const { ObjectId } = require("mongodb");

async function createReservation(req, res) {
  const db = getDb();
  const reservationNumber = `VW-${Date.now()}`;
  const reservation = {
    ...req.body,
    clientId: req.user.clientId,
    reservationNumber,
    createdAt: new Date(),
  };
  try {
    const { insertedId } = await db
      .collection("reservations")
      .insertOne(reservation);
    const saved = await db
      .collection("reservations")
      .findOne({ _id: insertedId });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
}

async function getAllReservations(req, res) {
  const db = getDb();
  try {
    const reservations = await db
      .collection("reservations")
      .find({ clientId: req.user.clientId })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
}

async function searchReservations(req, res) {
  res.set("Cache-Control", "no-store");
  const db = getDb();
  const clientId = req.user.clientId;
  const query = (req.query.q || "").trim();

  if (!clientId) {
    return res.status(401).json({ error: "Client ID missing from token" });
  }

  if (!query) return res.json([]); // no query → empty result

  try {
    const results = await db
      .collection("reservations")
      .find({
        clientId,
        $or: [
          { reservationNumber: { $regex: `${query}$`, $options: "i" } },
          { name: { $regex: query, $options: "i" } },
          { vehicleModel: { $regex: query, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();

    return res.json(results);
  } catch (err) {
    console.error("Error searching reservations:", err);
    res.status(500).json({ error: "Failed to search reservations" });
  }
}

async function getReservationById(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid reservation id" });
  }
  const db = getDb();
  try {
    const reservation = await db
      .collection("reservations")
      .findOne({ _id: new ObjectId(id) });
    if (!reservation)
      return res.status(404).json({ error: "Reservation not found" });
    return res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reservation" });
  }
}

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  searchReservations,
};
