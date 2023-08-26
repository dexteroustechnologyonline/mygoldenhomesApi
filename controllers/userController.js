const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const sendUserToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

exports.RegisterUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      return res.status(501).json({
        success: false,
        message: "user not created",
      });
    }
    sendUserToken(user, 201, res);
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

// for mobile
exports.numberLoginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findOne({ mobile: req.body.mobile });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,

      user,
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

// for email and password
exports.LoginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new ErrorHander("Please Enter email ", 400));
    }
    const user = await User.findOne({
      $or: [{ email: username }, { mobile: username }],
    }).select("+password");

    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }

    sendUserToken(user, 200, res);
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

exports.getAllUser = catchAsyncErrors(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users: users,
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

exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
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

exports.mobileExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ mobile: req.params.mobile });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new mobile number",
      });
    }

    return res.status(200).json({
      success: true,
      message: " mobile number already exits",
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

exports.emailExist = catchAsyncErrors(async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "new email",
      });
    }

    return res.status(200).json({
      success: true,
      message: " email already exist",
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

//logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password

exports.ForgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not Found", 404));
  }

  //Get Reset Password Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email Please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `My Golden Homes Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});
