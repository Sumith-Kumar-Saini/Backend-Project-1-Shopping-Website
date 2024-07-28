const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/scatch_shopping_website");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    // maxlength: 50,
    // unique: true,
  },
  email: String,
  password: String,
  cart: { type: Array, default: [] },
  isadmin: Boolean,
  order: { type: Array, default: [] },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);