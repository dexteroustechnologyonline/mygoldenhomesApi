const mongoose = require("mongoose");

const commertialSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slugUrl: {
      type: String,
    },
    subCategoryId: {
      // propertyVarient flat or Vills or etc..
      type: mongoose.Schema.ObjectId,
      required: [true, "SubCategoryid Required"],
      ref: "SubCategory",
    },
    subCategory: {
      type: String,
      required: [true, "Please Enter SubCategory Name"],
      ref: "SubCategory",
    },

    spaceType: {
      type: String,
    },

    shopLocation: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commertial", commertialSchema);
