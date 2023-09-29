const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://rahulsinghsr037:myMongoDBAtlas@cluster0.js2xhon.mongodb.net/thought";

const connectToMongo = () => {
  try {
    mongoose.connect(mongoURI);
    console.log("Successfully connected to the DB!");
  } catch (error) {
    console.log("Unable to connect to DB " + error);
  }
};

module.exports = connectToMongo;
