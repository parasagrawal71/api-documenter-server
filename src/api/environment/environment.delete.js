const EnvironmentModel = require("../../models/environment.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete environment by mongoId
 */
module.exports.deleteEnvironment = (req, res, next) => {
  const { mongoId } = req.params;

  EnvironmentModel.findOneAndDelete({ _id: mongoId })
    .then((deletedEnvironment) => {
      if (!deletedEnvironment) {
        return errorResponse({ res, statusCode: 400, message: `Environment with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Environment with id ${mongoId} deleted`, data: deletedEnvironment });
    })
    .catch(next);
};
