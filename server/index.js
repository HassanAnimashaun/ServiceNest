const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDb, getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let db = getDb();

// db connection
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log(`app listening on port ${port}`);
    });
    db = getDb();
  }
});

//routes
app.get("/reservations", (req, res) => {
  let clients = [];

  db.collection("reservations")
    .find()
    .sort({ name: 1 })
    .forEach((user) => clients.push(user))
    .then(() => {
      res.status(200).json(clients);
    })
    .catch(() => {
      res.status(500).json({ error: "Cant fetch docs" });
    });
});

app.get("/reservations/:id", (req, res) => {
  const idParam = req.params.id;

  if (ObjectId.isValid(idParam)) {
    const id = new ObjectId(idParam);
    db.collection("reservations")
      .findOne({ _id: id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => {
        res.status(500).json({ error: "cant fetch docs" });
      });
  } else {
    res.status(500).json({ error: "Not valid doc id" });
  }
});

app.post("/reservations", (req, res) => {
  const user = req.body;

  db.collection("reservations")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "cant create new doc" });
    });
});
