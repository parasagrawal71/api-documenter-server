const ServiceModel = require("../../models/service.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return services list
 */
module.exports.getServices = (req, res, next) => {
  ServiceModel.find()
    .sort({ createdAt: -1 })
    .then((services) => {
      successResponse({ res, message: "List of services", data: services });
    })
    .catch(next);
};
