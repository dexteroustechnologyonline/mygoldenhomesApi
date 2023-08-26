const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({

  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "email already exist"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
