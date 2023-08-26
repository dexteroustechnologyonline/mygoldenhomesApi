const mongoose = require("mongoose");

const superCategorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  slugUrl: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SuperCategory", superCategorySchema);
