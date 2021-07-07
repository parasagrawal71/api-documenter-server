const EnvironmentModel = require("../../models/environment.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return environment list
 */
module.exports.getEnvironments = (req, res, next) => {
  EnvironmentModel.find()
    .then((environments) => {
      successResponse({ res, message: "List of environments", data: environments });
    })
    .catch(next);
};
