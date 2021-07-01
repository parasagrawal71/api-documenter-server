const passport = require("passport");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");
const { sendMail } = require("../../utils/send-mail");
const { randomNumbers } = require("../../utils/functions");
const { verifyEmailByOtpTemplate } = require("../../email-templates/verify-email-by-otp");
const { JWT_SECRET } = require("../../config");
const { signJwtToken } = require("./_helpers");

/**
 * @description Function to set password / reset password
 */
module.exports.setPassword = async (req, res, next) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `${!email ? "email" : "password"} is required`,
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `User not found`,
        error: user,
      });
    }

    user = await UserModel.findOneAndUpdate({ email }, { password });
    user.password = undefined;

    req.login(user, { session: false }, (error) => {
      if (error) return next(error);

      const [token, expiry] = signJwtToken(user);
      return successResponse({ res, message: "Password set successfully", data: { user, token, expiry } });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Function to handle forgot password
 */
module.exports.handleForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `email is required`,
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `User not found`,
        error: user,
      });
    }

    const otp = randomNumbers(4);
    user = await UserModel.findOneAndUpdate({ email }, { otp });

    const _verifyEmailByOtpTemplate = verifyEmailByOtpTemplate(otp);
    const sendMailRes = await sendMail({ to: email, subject: "Verify Your Email", html: _verifyEmailByOtpTemplate });
    if (sendMailRes && sendMailRes[0] === false) {
      return next(sendMailRes[1]);
    }

    user.otp = undefined;
    user.password = undefined;
    return successResponse({ res, message: "OTP sent to your email address successfully", data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Function to verify email address by OTP sent on email
 */
module.exports.verifyEmailAdress = async (req, res, next) => {
  try {
    const { email, otp } = req.query;
    if (!email || !otp) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `${!email ? "email" : "otp"} is required`,
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return errorResponse({
        res,
        statusCode: 400,
        message: `Email verification failed: User not found`,
        error: user,
      });
    }

    const [validate, info] = await user.isValidOtp(otp);
    if (!validate) {
      return errorResponse({ res, statusCode: 400, message: `Email verification failed: Wrong OTP`, error: validate });
    }

    user = await UserModel.findOneAndUpdate({ email }, { $unset: { otp: 1 } });
    user.password = undefined;
    return successResponse({ res, message: "Email verified successfully", data: user });
  } catch (error) {
    next(error);
  }
};
