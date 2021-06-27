const ServiceModel = require("../../models/service.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a service
 */
module.exports.createService = (req, res, next) => {
  const serviceObj = ServiceModel(req.body);
  serviceObj
    .save()
    .then((createdService) => {
      successResponse({ res, message: "Service created", data: createdService });
    })
    .catch(next);
};
