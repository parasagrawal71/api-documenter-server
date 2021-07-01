const ServiceModel = require("../../models/service.model");
const ApisTreeModel = require("../../models/apisTree.model");
const EndpointModel = require("../../models/endpoint.model");
const EnvironmentModel = require("../../models/environment.model");
const ReadmeModel = require("../../models/readme.model");
const SchemaModel = require("../../models/schema.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete service by mongoId
 */
module.exports.deleteService = async (req, res, next) => {
  const { mongoId } = req.params;

  await Promise.all([
    deleteApisTreeOfService(mongoId),
    deleteEndpointsOfService(mongoId),
    deleteEnvironmentsOfService(mongoId),
    deleteReadmesOfService(mongoId),
    deleteSchemasOfService(mongoId),
  ]);

  ServiceModel.findOneAndDelete({ _id: mongoId })
    .then((deletedService) => {
      if (!deletedService) {
        return errorResponse({ res, statusCode: 400, message: `Service with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Service with id ${mongoId} deleted`, data: deletedService });
    })
    .catch(next);
};

const deleteApisTreeOfService = (serviceMID) => {
  return ApisTreeModel.deleteMany({ serviceMID })
    .then((response) => [true, response])
    .catch((error) => [false, error]);
};
const deleteEndpointsOfService = (serviceMID) => {
  return EndpointModel.deleteMany({ serviceMID })
    .then((response) => [true, response])
    .catch((error) => [false, error]);
};

const deleteEnvironmentsOfService = (serviceMID) => {
  return EnvironmentModel.deleteMany({ serviceMID })
    .then((response) => [true, response])
    .catch((error) => [false, error]);
};

const deleteReadmesOfService = (serviceMID) => {
  return ReadmeModel.deleteMany({ serviceMID })
    .then((response) => [true, response])
    .catch((error) => [false, error]);
};

const deleteSchemasOfService = (serviceMID) => {
  return SchemaModel.deleteMany({ serviceMID })
    .then((response) => [true, response])
    .catch((error) => [false, error]);
};
