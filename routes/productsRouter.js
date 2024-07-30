const express = require("express");
const router = express.Router();

const productModel = require("../models/product-model");

const upload = require("../config/multer-config");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully.")
    res.redirect("/owners/admin");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
