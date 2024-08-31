import dotenv from "dotenv";
import { Vonage } from "@vonage/server-sdk";
import crypto from "crypto";

dotenv.config({
  path: "./.env",
});
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const sendOtp = (phoneNumber) => {
//   return client.verify.v2
//     .services(process.env.TWILIO_SERVICE_SID)
//     .verifications.create({ to: phoneNumber, channel: "sms" });
// };

// const verifyOtp = (phoneNumber, code) => {
//   return client.verify.v2
//     .services(process.env.TWILIO_SERVICE_SID)
//     .verificationChecks.create({ to: phoneNumber, code });
// };

// export { sendOtp, verifyOtp };

export const otpStore = {};

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (phoneNumber) => {
  const otp = generateOTP();
  const from = "VonageAPI";
  const text = `Your OTP is ${otp}`;
  const to = phoneNumber;

  await vonage.sms
    .send({ to, from, text })
    .then((response) => {
      // console.log(response.messages[0].status);
      if (response.messages[0].status === "0") {
        otpStore[phoneNumber] = { otp, expiresAt: Date.now() + 300000 };
        otpStore[phoneNumber].canResendAt = Date.now() + 30000;
      } else {
        console.log(`Error: ${response.messages[0]}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const verifyOTP = (phoneNumber, otp) => {
  const storedOtp = otpStore[phoneNumber];
  // console.log(storedOtp);
  if (storedOtp && storedOtp.otp === otp && Date.now() < storedOtp.expiresAt) {
    // console.log("abc");
    return true;
  }
  return false;
};
const reSendOtp = (phoneNumber) => {
  const storedOtp = otpStore[phoneNumber];
  if (storedOtp && Date.now() >= storedOtp.canResendAt) {
    delete otpStore[phoneNumber];
    sendOTP(phoneNumber);
  }
};

export { sendOTP, verifyOTP, reSendOtp };
