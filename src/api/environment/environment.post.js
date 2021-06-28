const EnvironmentModel = require("../../models/environment.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create an environment
 */
module.exports.createEnvironment = (req, res, next) => {
  const environmentObj = EnvironmentModel(req.body);
  environmentObj
    .save()
    .then((createdEnvironment) => {
      successResponse({ res, message: "Environment created", data: createdEnvironment });
    })
    .catch(next);
};
