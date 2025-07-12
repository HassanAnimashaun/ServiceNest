const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  vehicle: {
    year: String,
    make: String,
    model: String,
    color: String,
  },
  service: {
    type: String,
    required: true,
  },
  note: String,
  images: [String],
  reservationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
