const Property = require("../models/propertyModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Property
exports.createProperty = catchAsyncErrors(async (req, res, next) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({
      success: true,
      property,
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

// Get Properties

exports.getAllProperties = catchAsyncErrors(async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Property.find(), req.query).search();
    const properties = await apiFeatures.query;

    res.status(200).json({
      success: true,
      properties,
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

exports.getPropertyById = catchAsyncErrors(async (req, res, next) => {
  try {
    let property = await Property.findOne({
      propertyID: Number(req.params.id),
    });

    if (!property) {
      return res.status(500).json({
        success: false,
        message: "Property not found",
      });
    }
    res.status(200).json({
      success: true,
      property: property,
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

//Upload Property Images
exports.UploadPropertyImages = catchAsyncErrors(async (req, res, next) => {
  try {
    const desktopImage = await cloudinary.v2.uploader.upload(
      req.body.desktopImage,
      {
        folder: "Property/DesktopImage",
        width: 1200,
        height: 800,
        crop: "scale",
      }
    );

    const desktopImages = desktopImage.secure_url;
    res.status(200).json({
      success: true,
      desktopImages,
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
// Update Properties
exports.UpdateProperty = catchAsyncErrors(async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(500).json({
        success: false,
        message: "Property not found",
      });
    }
    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      property: property,
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

// Delete Properties
exports.DeleteProperty = catchAsyncErrors(async (req, res, next) => {
  try {
    let property = await Property.findOne({
      propertyID: Number(req.params.propid),
    });
    if (!property) {
      return res.status(500).json({
        success: false,
        message: "Property not found",
      });
    }

    await property.remove();
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
