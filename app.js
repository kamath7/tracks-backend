require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
app.use(bodyParser.json()); //to handle json

app.use(authRoutes);
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("successfully connected!");
});
mongoose.connection.on("error", (err) => {
  console.error(err, "Error connecting");
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
