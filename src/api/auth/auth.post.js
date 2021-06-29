const passport = require("passport");
const { successResponse, errorResponse } = require("../../utils/response.format");
const UserModel = require("../../models/user.model");

/**
 * @description Function to register user
 */
module.exports.register = (req, res, next) => {
  passport.authenticate("register", { session: false }, async (err, user) => {
    if (err) {
      return next(err);
    }

    await UserModel.findOneAndUpdate({ email: user && user.email }, { name: req.body && req.body.name }).catch(next);

    user.otp = undefined;
    user.password = undefined;
    return successResponse({
      res,
      message: "Account created: Please verify your email address",
      data: user,
    });
  })(req, res, next);
};
