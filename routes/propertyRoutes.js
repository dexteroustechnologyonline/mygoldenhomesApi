const express = require("express");
const {
  getAllProperties,
  createProperty,
  UpdateProperty,
  DeleteProperty,
  getPropertyById,
  UploadPropertyImages
} = require("../controllers/propertyController");

const router = express.Router();

router.route("/new").post(createProperty);
router.route("/all").get(getAllProperties);
router.route("/propertyby/:id").get(getPropertyById);

router.route("/propertyimages").post(UploadPropertyImages);

router.route("/updateby/:id").put(UpdateProperty);
router.route("/deleteby/:propid").delete(DeleteProperty);    //not working

module.exports = router;
