const SubCategory = require("../models/subCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Subcategory
exports.createSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const subcategory = await SubCategory.create(req.body);
    res.status(201).json({
      success: true,
      subcategory,
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

// Get SubCategory
exports.getAllSubCategory = catchAsyncErrors(async (req, res) => {
  try {
    const subcategory = await SubCategory.find();
    res.status(200).json({
      success: true,
      subcategory: subcategory,
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

// Update SubCategory
exports.UpdateSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      subcategory: subcategory,
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

// Delete SubCategory
exports.DeleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "subcategory not found",
      });
    }
    await subcategory.remove();
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

exports.SubCatSlugUrlExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let subcategory = await SubCategory.findOne({
        slugUrl: req.params.slugurl,
    });

    if (!subcategory) {
      return res.status(500).json({
        success: false,
        message: "new subcategory SlugUrl",
      });
    }

    return res.status(200).json({
      success: true,
      message: " subcategory SlugUrl already exist",
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
