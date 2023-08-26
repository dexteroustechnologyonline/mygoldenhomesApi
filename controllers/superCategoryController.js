const SuperCategory = require("../models/superCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create SuperCategory
exports.createSuperCategory = async (req, res, next) => {
  try {
    const supercategory = await SuperCategory.create(req.body);
    res.status(201).json({
      success: true,
      supercategory,
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
};

// Get SuperCategory
exports.getAllSuperCategory = async (req, res) => {
  try {
    const supercategories = await SuperCategory.find();
    res.status(200).json({
      success: true,
      supercategories,
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
};

//Update SuperCategory
exports.UpdateSuperCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let supercategory = await SuperCategory.findById(req.params.id);
    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "supercategory not found",
      });
    }
    supercategory = await SuperCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      supercategory: supercategory,
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

//Delete SuperCategory
exports.DeleteSuperCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let supercategory = await SuperCategory.findById(req.params.id);
    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "supercategory not found",
      });
    }
    await supercategory.remove();
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
    let supercategory = await SuperCategory.findOne({
      slugUrl: req.params.slugurl,
    });

    if (!supercategory) {
      return res.status(500).json({
        success: false,
        message: "new SuperCategory SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " SuperCategory SlugUrl already exist",
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
