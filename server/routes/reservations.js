const express = require("express");
const {
  verifyToken,
  requireAdmin,
  requireRole,
} = require("../middleware/auth");
const controller = require("../controllers/reservationController");

const router = express.Router();

// Create a new reservation (public endpoint)
router.post("/", controller.createReservation);

// Admin: get all reservations
router.get(
  "/",
  verifyToken,
  requireRole(["admin", "staff"]),
  controller.getAllReservations
);
// Admin: get reservation by id
router.get(
  "/",
  verifyToken,
  requireRole(["admin", "staff"]),
  controller.getAllReservations
);
module.exports = router;
