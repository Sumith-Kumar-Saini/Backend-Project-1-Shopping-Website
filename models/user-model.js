const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
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