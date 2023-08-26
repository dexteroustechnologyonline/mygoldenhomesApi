const express = require("express");
const {
  createSuperCategory,
  getAllSuperCategory,
  UpdateSuperCategory,
  DeleteSuperCategory,
  SlugUrlExist,
} = require("../controllers/superCategoryController");

const router = express.Router();

router.route("/new").post(createSuperCategory);
router.route("/all").get(getAllSuperCategory);

router.route("/updateby/:id").put(UpdateSuperCategory);
router.route("/deleteby/:id").delete(DeleteSuperCategory); // Not working

router.route("/slugurl/:slugurl").get(SlugUrlExist);

module.exports = router;
