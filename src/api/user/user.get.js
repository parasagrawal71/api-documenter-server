const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return user list
 */
module.exports.getUsers = (req, res, next) => {
  UserModel.find()
    .then((users) => {
      successResponse({ res, message: "List of users", data: users });
    })
    .catch(next);
};

/**
 * @description Function to return a user by mongoId
 */
module.exports.getUserById = (req, res, next) => {
  const { mongoId } = req.params;

  UserModel.findOne({ _id: mongoId })
    .then((user) => {
      if (!user) {
        return errorResponse({ res, statusCode: 400, message: `User with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `User details for id: ${mongoId}`, data: user });
    })
    .catch(next);
};
