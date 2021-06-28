const EndpointModel = require("../../models/endpoint.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return endpoints list
 */
module.exports.getEndpoints = (req, res, next) => {
  const { serviceMID } = req.query;

  EndpointModel.find({ serviceMID })
    .then((endpoints) => {
      successResponse({ res, message: "List of endpoints", data: endpoints });
    })
    .catch(next);
};

/**
 * @description Function to return an endpoint by mongoId
 */
module.exports.getEndpointById = (req, res, next) => {
  const { mongoId } = req.params;

  EndpointModel.findOne({ _id: mongoId })
    .then((endpoint) => {
      if (!endpoint) {
        return errorResponse({ res, statusCode: 400, message: `Endpoint with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Endpoint details for id: ${mongoId}`, data: endpoint });
    })
    .catch(next);
};
