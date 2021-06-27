const EndpointModel = require("../../models/endpoint.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a endpoint
 */
module.exports.createEndpoint = (req, res, next) => {
  const endpointObj = EndpointModel(req.body);
  endpointObj
    .save()
    .then((createdEndpoint) => {
      successResponse({ res, message: "Endpoint created", data: createdEndpoint });
    })
    .catch(next);
};
