const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const reservationRoutes = require('./routes/reservations');
const { connectToDb } = require('./db');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'https://villinwraps.vercel.app',
    credentials: true,
  })
);

app.use('/api', apiRoutes);
app.use('/api/reservations', reservationRoutes);

connectToDb((err) => {
  if (!err) {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Failed to connect to MongoDB:', err);
  }
});
