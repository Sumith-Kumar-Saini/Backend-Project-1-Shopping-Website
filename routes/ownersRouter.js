const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(500)
        .send("You don't have permission to create a new owner.");
    }

    const { fullname, email, password } = req.body;

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/", function (req, res) {
  res.send("hay it's owners");
});

module.exports = router;
