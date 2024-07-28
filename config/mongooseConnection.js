const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/scatch_shopping_website")
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;