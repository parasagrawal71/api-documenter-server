const passport = require("passport");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to register user
 */
module.exports.register = (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    user.otp = undefined;
    user.password = undefined;
    return successResponse({
      res,
      message: "Account created: Please verify your email address",
      data: user,
    });
  })(req, res, next);
};
