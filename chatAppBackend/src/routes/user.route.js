import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createUser,
  getUsers,
  getUsersByPhone,
  loginUser,
  logoutUser,
  reSendOtp,
  sendOtpRequest,
  verifyUserOtp,
} from "../controller/user.controller.js";

const router = Router();

router.route("/create").post(upload.single("profileImage"), createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/send-otp").post(sendOtpRequest);
router.route("/verify-otp").post(verifyUserOtp);
router.route("/resend-otp").post(reSendOtp);
router.route("/get-users").get(getUsers);
router.route("/get-users-by-phone").post(getUsersByPhone);

export default router;
