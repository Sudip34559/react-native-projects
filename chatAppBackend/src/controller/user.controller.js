import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiArror.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinery } from "../utils/cloudinary.js";
import { reSendOtp, sendOTP, verifyOTP } from "../services/otp.service.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber } = req.body;
  // console.log(req.body);
  // console.log(req.file);

  try {
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      if (existingUser.isActive) {
        throw new ApiError(
          400,
          " Active user already exists with this phone number"
        );
      }
    }
    const AavatarLocalFilePath = req.file?.path;

    const avatar = await uploadOnCloudinery(AavatarLocalFilePath);
    const user = await User.create({
      name,
      phoneNumber,
      profileImage: avatar?.url,
    });

    if (!user) {
      throw new ApiError(500, "Failed to create user");
    }
    return res
      .status(201)
      .json(new ApiResponse(201, user, "User created successfully"));
  } catch (error) {
    throw error;
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  // console.log(phoneNumber);
  const user = await User.findOne({ phoneNumber });
  // console.log(user);
  if (!user) {
    throw new ApiError(401, "User Not Found");
  }
  if (user.isActive) {
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          {},
          "Active user allready exest with this phone number"
        )
      );
  }

  user.isActive = true;
  user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  // console.log(phoneNumber);
  // const phoneNumber = "+919734869602";
  const user = await User.findOne({ phoneNumber });
  // console.log(user);
  user.isActive = false;
  user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const sendOtpRequest = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const otpVerification = sendOTP(phoneNumber);
    if (!otpVerification) {
      throw new ApiError(500, "Failed to send OTP");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, otpVerification, "OTP sent successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Internal server error");
  }
});

const verifyUserOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verificationCheck = verifyOTP(phoneNumber, code);
    if (!verificationCheck) {
      throw new ApiError(401, "Invalid OTP");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, verificationCheck, "Verified Successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Internal server error");
  }
});

const resendOtp = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    reSendOtp(phoneNumber);
    return res
      .status(200)
      .json(new ApiResponse(200, null, "OTP resent successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Internal server error");
  }
});
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
const getUsersByPhone = asyncHandler(async (req, res) => {
  const { phoneNumbers } = req.body;
  try {
    const users = await User.find({
      phoneNumber: { $in: phoneNumbers },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw error;
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  sendOtpRequest,
  verifyUserOtp,
  reSendOtp,
  getUsers,
  getUsersByPhone,
};
