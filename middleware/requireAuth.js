const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "You must be logged in " });
  }
  const token = authorization.replace("Bearer ", ""); //removing bearer
  jwt.verify(token, process.env.KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ message: "Invalid credentials " });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
