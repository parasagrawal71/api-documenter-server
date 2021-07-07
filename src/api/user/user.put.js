const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update user by mongoId
 */
module.exports.updateUser = (req, res, next) => {
  const { mongoId } = req.params;

  UserModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedUser) => {
      if (!updatedUser) {
        return errorResponse({ res, statusCode: 400, message: `User with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `User with id ${mongoId} updated`, data: updatedUser });
    })
    .catch(next);
};
