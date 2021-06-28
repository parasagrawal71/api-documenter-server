const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete user by mongoId
 */
module.exports.deleteUser = (req, res, next) => {
  const { mongoId } = req.params;

  UserModel.findOneAndDelete({ _id: mongoId })
    .then((deletedUser) => {
      if (!deletedUser) {
        return errorResponse({ res, statusCode: 400, message: `User with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `User with id ${mongoId} deleted`, data: deletedUser });
    })
    .catch(next);
};
