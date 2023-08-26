const express = require("express");
const {
  createCommertial,
  getAllCommertial,
  UpdateCommertial,
  DeleteCommertial,
  SlugUrlExist
} = require("../controllers/commertialController");

const router = express.Router();

router.route("/new").post(createCommertial);
router.route("/all").get(getAllCommertial);

router.route("/slugurl/:slugurl").get(SlugUrlExist);

router.route("/updateby/:id").put(UpdateCommertial);
router.route("/deleteby/:id").delete(DeleteCommertial); // not working

module.exports = router;
