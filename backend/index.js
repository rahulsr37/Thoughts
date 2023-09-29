const express = require("express");
const connectToMongo = require("./db");
require("dotenv").config();
const cors = require('cors')

const app = express();
const port = process.env.PORT;
app.use(cors())

connectToMongo();

app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/thoughts", require("./routes/thoughts"));

app.listen(port, () => {
  console.log(`Thoughts of the day! app listening on  http://localhost:${port}`);
});
