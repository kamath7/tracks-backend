const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.KEY); //creating a token

    res.status(201).send({ token });
  } catch (error) {
    return res.status(422).send({ message: "Something went wrong", error });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ message: "Must provide email or password" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(422)
      .send({ message: "No one found out with that email!" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, process.env.KEY)
    res.send({token})
  } catch (error) {
    return res.status(422).send({ message: "Incorrect credentials entered!" });
  }
});

module.exports = router;
