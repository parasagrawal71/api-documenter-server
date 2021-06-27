const EndpointModel = require("../../models/endpoint.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete endpoint by mongoId
 */
module.exports.deleteEndpoint = (req, res, next) => {
  const { mongoId } = req.params;

  EndpointModel.findOneAndDelete({ _id: mongoId })
    .then((deletedEndpoint) => {
      if (!deletedEndpoint) {
        return errorResponse({ res, statusCode: 400, message: `Endpoint with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Endpoint with id ${mongoId} deleted`, data: deletedEndpoint });
    })
    .catch(next);
};

/**
 * @description Function to delete multiple endpoints by mongoIds
 */
module.exports.deleteMultipleEndpoints = (req, res, next) => {
  const { mongoIds } = req.query;

  if (!mongoIds || !Array.isArray(mongoIds)) {
    return errorResponse({ res, statusCode: 400, message: `mongoIds field must be array` });
  }

  EndpointModel.deleteMany({ _id: { $in: mongoIds } })
    .then((deletedEndpoints) => {
      // if (!deletedEndpoints) {
      //   return errorResponse({ res, statusCode: 400, message: `Endpoint with id ${mongoId} NOT found` });
      // }

      successResponse({ res, message: `Endpoints with id ${mongoIds} deleted`, data: deletedEndpoints });
    })
    .catch(next);
};
