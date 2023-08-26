const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  slugUrl: {
    type: String,
  },
  superCategoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "SuperCategory",
  },
  superCategory: {
    type: String,
    ref: "SuperCategory",
  },
  mobileImage: {
    type: String,
  },
  desktopImage: {
    type: String,
  },
  priority: {
    type: String,
    default: "12",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
