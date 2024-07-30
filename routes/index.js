const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const { logoutUser } = require("../controllers/authController");

const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  console.log(user);
  res.render("cart", { user });
});

router.get("/addtocart/:_id", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params._id);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/logout", isLoggedIn, logoutUser);

module.exports = router;