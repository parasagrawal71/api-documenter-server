const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");
const { successResponse, errorResponse } = require("../../utils/response.format");
const { GOOGLE_CLIENT_ID } = require("../../config");
const UserModel = require("../../models/user.model");
const { signJwtToken } = require("./_helpers");

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * @description Function to login
 */
module.exports.login = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        const { message, errorCode } = info;
        return errorResponse({ res, statusCode: 400, message, errorCode });
      }

      req.login(user, { session: false }, (error) => {
        if (error) return next(error);

        const [token, expiry] = signJwtToken(user);
        return successResponse({ res, message: "Logged in successfully", data: { token, expiry } });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

/**
 * @description Function to login / register using google oauth
 */
module.exports.googleLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const googleResponse = await googleClient.verifyIdToken({
      idToken: authorization.substring(7),
      audience: GOOGLE_CLIENT_ID,
    });

    if (googleResponse) {
      const { email_verified, name, email, tokenId } = googleResponse.payload;

      let user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({ email, isVerified: true });
      }

      user.password = undefined;
      user.otp = undefined;
      return successResponse({ res, message: "Logged in successfully", data: user });
    }

    return errorResponse({ res, statusCode: 500, message: "Something went wrong!" });
  } catch (error) {
    return next(error);
  }
};

/**
 * @description Function to verify new account by pressing verify button on email sent
 */
module.exports.accountVerification = async (req, res, next) => {
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
        message: `Account verification failed: User not found`,
        error: user,
      });
    }

    const validate = await user.isValidOtp(otp);
    if (!validate) {
      return res.sendFile(path.join(__dirname, "../../views/verify-email-error.html"));
    }

    user = await UserModel.findOneAndUpdate({ email }, { $unset: { otp: 1 }, $set: { isVerified: true } });
    user.password = undefined;
    return res.sendFile(path.join(__dirname, "../../views/verify-email-success.html"));
  } catch (error) {
    next(error);
  }
};
