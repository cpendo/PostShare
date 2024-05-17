const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken")

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // create new user document in db
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });

    if (user) {
      return res
        .status(201)
        .json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user email exists in db
    const user = await User.findOne({ email });
    // return user obj if their password matches
    if (user && (await user.matchPassword(password))) {
      const userData = { _id: user._id, name: user.name, email: user.email };
      res.status(200).json({ ...userData, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { signin, signup };
