const EnvironmentModel = require("../../models/environment.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update environment by mongoId
 */
module.exports.updateEnvironment = (req, res, next) => {
  const { mongoId } = req.params;

  EnvironmentModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedEnvironment) => {
      if (!updatedEnvironment) {
        return errorResponse({ res, statusCode: 400, message: `Environment with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Environment with id ${mongoId} updated`, data: updatedEnvironment });
    })
    .catch(next);
};
