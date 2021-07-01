const ServiceModel = require("../../models/service.model");
const EndpointModel = require("../../models/endpoint.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return services list
 */
module.exports.getServices = (req, res, next) => {
  ServiceModel.find()
    .sort({ createdAt: -1 })
    .then(async (services) => {
      const updatedServices = await Promise.all(
        services &&
          services.map((service) => {
            return EndpointModel.countDocuments({ serviceMID: service._id }).then((count) => {
              console.log("count ", count);
              return {
                ...service._doc,
                endpointsCount: count || 0,
              };
            });
          })
      );
      console.log("updatedServices ", updatedServices);
      successResponse({ res, message: "List of services", data: updatedServices });
    })
    .catch(next);
};
