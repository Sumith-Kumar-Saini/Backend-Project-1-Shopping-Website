const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerUser = async function (req, res) {
  try {
    const { email, fullname, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("You already have account, please login.");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          const user = await userModel.create({
            email,
            fullname,
            password: hash,
          });

          const token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(401).send("Invalid email or password.");
  
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) return res.send(err.message);
    else if (!result) return res.status(401).send("Invalid password.");
    else {
      const token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    }
  });

};

module.exports.logoutUser = function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
};