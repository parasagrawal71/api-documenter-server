const EndpointModel = require("../../models/endpoint.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update endpoint by mongoId
 */
module.exports.updateEndpoint = (req, res, next) => {
  const { mongoId } = req.params;

  EndpointModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedEndpoint) => {
      if (!updatedEndpoint) {
        return errorResponse({ res, statusCode: 400, message: `Endpoint with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Endpoint with id ${mongoId} updated`, data: updatedEndpoint });
    })
    .catch(next);
};
