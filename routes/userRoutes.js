const express = require("express");
const {
  RegisterUser,
  LoginUser,
  getAllUser,
  logout,
  ForgotPassword,
  getUserById,
  mobileExist,
  emailExist,
  numberLoginUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/numberlogin").post(numberLoginUser);
router.route("/login").post(LoginUser);
router
  .route("/all")
  .get(isAuthenticatedUser, authorizeRoles("User"), getAllUser);

router.route("/userById/:id").get(getUserById);
router.route("/mobile/:mobile").get(mobileExist);
router.route("/email/:email").get(emailExist);


router.route("/password/forgot").post(ForgotPassword);
router.route("/logout").get(logout);

module.exports = router;
