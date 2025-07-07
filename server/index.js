const apiRoutes = require("./routes/api");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://villinwraps.onrender.com",
    credentials: true,
  })
);

app.use("/api", apiRoutes);

let db;

// 🧠 Connect to DB, then start the server
connectToDb((err) => {
  if (!err) {
    db = getDb();

    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error("Failed to connect to MongoDB:", err);
  }
});

// Routes — safe to use now that db is connected
app.get("/reservations", (req, res) => {
  const clients = [];
  db.collection("reservations")
    .find()
    .sort({ name: 1 })
    .forEach((user) => clients.push(user))
    .then(() => res.status(200).json(clients))
    .catch(() => res.status(500).json({ error: "Cant fetch docs" }));
});

app.get("/reservations/:id", (req, res) => {
  const idParam = req.params.id;
  if (ObjectId.isValid(idParam)) {
    const id = new ObjectId(idParam);
    db.collection("reservations")
      .findOne({ _id: id })
      .then((doc) => res.status(200).json(doc))
      .catch(() => res.status(500).json({ error: "cant fetch docs" }));
  } else {
    res.status(500).json({ error: "Not valid doc id" });
  }
});

app.post("/reservations", (req, res) => {
  const user = req.body;
  db.collection("reservations")
    .insertOne(user)
    .then((result) => res.status(201).json(result))
    .catch(() => res.status(500).json({ error: "cant create new doc" }));
});
