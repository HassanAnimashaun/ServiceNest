const { MongoClient } = require("mongodb");
require("dotenv").config();

let dbConnection;

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", process.env.MONGODB_URI);
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db("Reservations");
        console.log("MongoDB connected");
        return cb();
      })
      .catch((err) => {
        console.error("Connection error:", err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
