const ServiceModel = require("../../models/service.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete service by mongoId
 */
module.exports.deleteService = (req, res, next) => {
  const { mongoId } = req.params;

  ServiceModel.findOneAndDelete({ _id: mongoId })
    .then((deletedService) => {
      if (!deletedService) {
        return errorResponse({ res, statusCode: 400, message: `Service with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Service with id ${mongoId} deleted`, data: deletedService });
    })
    .catch(next);
};
