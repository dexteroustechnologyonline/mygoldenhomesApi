const express = require("express");
const {
  createCategory,
  getAllCategory,
  UpdateCategory,
  DeleteCategory,
  SlugUrlExist,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/new").post(createCategory);
router.route("/all").get(getAllCategory);

router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/updateby/:id").put(UpdateCategory);
router.route("/deleteby/:id").delete(DeleteCategory); // not working

module.exports = router;
