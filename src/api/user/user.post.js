const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a user
 */
module.exports.createUser = (req, res, next) => {
  const userObj = UserModel(req.body);
  userObj
    .save()
    .then((createdUser) => {
      successResponse({ res, message: "User created", data: createdUser });
    })
    .catch(next);
};
