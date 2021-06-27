const moment = require("moment");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

/**
 * @description Function to sign jwt token
 */
module.exports.signJwtToken = (user) => {
  const expiry = +moment(new Date()).add(24, "hours").format("x");
  const token = jwt.sign(
    { _id: user._id, email: user.email, iss: "api-documenter.com", iat: +moment(new Date()).format("x"), exp: expiry },
    JWT_SECRET
  );
  return [token, expiry];
};
