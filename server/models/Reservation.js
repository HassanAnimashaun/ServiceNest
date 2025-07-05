const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  vehicle: {
    year: String,
    make: String,
    model: String,
    color: String,
  },
  service: String,
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
});

// This line makes the model accessible to other files
module.exports = mongoose.model("Reservation", ReservationSchema);
