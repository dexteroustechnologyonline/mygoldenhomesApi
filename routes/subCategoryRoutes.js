const express = require("express");
const { createSubCategory, getAllSubCategory, UpdateSubCategory, DeleteSubCategory, SubCatSlugUrlExist } = require("../controllers/subCategoryController");

const router = express.Router();

router.route("/new").post(createSubCategory);
router.route("/all").get(getAllSubCategory);

router.route("/slugurl/:slugurl").get(SubCatSlugUrlExist);

router.route("/updateby/:id").put(UpdateSubCategory);
router.route("/deleteby/:id").delete(DeleteSubCategory); // not working

module.exports = router;
