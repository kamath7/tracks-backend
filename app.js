require("dotenv").config();
require("./models/User");
require("./models/Tracks");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middleware/requireAuth");
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
app.use(bodyParser.json()); //to handle json

app.use(authRoutes);
app.use(trackRoutes);
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

app.get("/", requireAuth, (req, res) => {
  res.json({
    message: `Welcome ${req.user.email}`,
  });
});
app.get("/lalle", (req, res) => {
  res.json({
    message: "Drink water",
  });
});
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
