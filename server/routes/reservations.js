const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middleware/auth");
const controller = require("../controllers/reservationController");

router.post("/", verifyToken, controller.createReservation);

router.get("/", verifyToken, controller.getAllReservations);

router.get("/:id", verifyToken, controller.getReservationById);

module.exports = router;
