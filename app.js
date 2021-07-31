require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongoUri =process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("successfully connected!");
});
mongoose.connection.on('error',(err)=>{
    console.error(err,'Error connecting')
})

app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
