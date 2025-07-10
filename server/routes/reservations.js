const express = require('express');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const controller = require('../controllers/reservationController');

const router = express.Router();

// Create a new reservation (public endpoint)
router.post('/', controller.createReservation);

// Admin: get all reservations
router.get('/', verifyToken, requireAdmin, controller.getAllReservations);

// Admin: get reservation by id
router.get('/:id', verifyToken, requireAdmin, controller.getReservationById);

module.exports = router;
