const ServiceModel = require("../../models/service.model");
const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update service by mongoId
 */
module.exports.updateService = async (req, res, next) => {
  const { mongoId } = req.params;

  if (mongoId === "62920390b3931700682e2fc7") {
    return errorResponse({ res, statusCode: 400, message: `This is an example service and cannot be updated` });
  }

  const serviceToBeUpdated = await ServiceModel.findOne({ _id: mongoId }).catch(next);

  ServiceModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then(async (updatedService) => {
      if (!updatedService) {
        return errorResponse({ res, statusCode: 400, message: `Service with id ${mongoId} NOT found` });
      }

      await updateServiceNamesInAllUsers(
        serviceToBeUpdated && serviceToBeUpdated.serviceName,
        updatedService && updatedService.serviceName
      );

      successResponse({ res, message: `Service with id ${mongoId} updated`, data: updatedService });
    })
    .catch(next);
};

const updateServiceNamesInAllUsers = (oldServiceName, newServiceName) => {
  return UserModel.updateMany({ editAccess: oldServiceName }, { $set: { "editAccess.$": newServiceName } });
};
