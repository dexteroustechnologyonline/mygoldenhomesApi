const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
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
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  category: {
    type: String,
    ref: "Category",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
