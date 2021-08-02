const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({userId: user._id}, process.env.KEY) //creating a token
    
    res.status(201).send({token});
  } catch (error) {
   return  res.status(422).send({ message: "Something went wrong", error });
  }
});

module.exports = router;
