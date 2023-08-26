const Commertial = require("../models/commertialModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Commertial
exports.createCommertial = catchAsyncErrors(async (req, res, next) => {
  try {
    const commertial = await Commertial.create(req.body);
    res.status(201).json({
      success: true,
      commertial,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

// Get Commertial
exports.getAllCommertial = catchAsyncErrors(async (req, res) => {
  try {
    const commertial = await Commertial.find();
    res.status(200).json({
      success: true,
      commertial: commertial,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

// Update Commertial
exports.UpdateCommertial = catchAsyncErrors(async (req, res, next) => {
  try {
    let commertial = await Commertial.findById(req.params.id);
    if (!commertial) {
      return res.status(500).json({
        success: false,
        message: "Commertial not found",
      });
    }
    commertial = await Commertial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      commertial: commertial,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

//delete Commertial
exports.DeleteCommertial = catchAsyncErrors(async (req, res, next) => {
  try {
    let commertial = await Commertial.find(req.params.id);
    if (!commertial) {
      return res.status(500).json({
        success: false,
        message: "Commertial not found",
      });
    }

    await commertial.remove();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});

exports.SlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let commertial = await Commertial.findOne({ slugUrl: req.params.slugurl });

    if (!commertial) {
      return res.status(500).json({
        success: false,
        message: "new commertial SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " commertial SlugUrl already exist",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(400).json({
      success: false,
      massage: error._message,
      error: error,
    });
    res.status(500).json({
      success: false,
      massage: error._message,
      error: error,
    });
  }
});
