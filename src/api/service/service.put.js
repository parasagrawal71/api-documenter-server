const ServiceModel = require("../../models/service.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update service by mongoId
 */
module.exports.updateService = (req, res, next) => {
  const { mongoId } = req.params;

  ServiceModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedService) => {
      if (!updatedService) {
        return errorResponse({ res, statusCode: 400, message: `Service with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Service with id ${mongoId} updated`, data: updatedService });
    })
    .catch(next);
};
