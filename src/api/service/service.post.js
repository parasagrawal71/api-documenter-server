const ServiceModel = require("../../models/service.model");
const UserModel = require("../../models/user.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a service
 */
module.exports.createService = (req, res, next) => {
  const serviceObj = ServiceModel(req.body);
  serviceObj
    .save()
    .then(async (createdService) => {
      await addServiceInEditAccessOfCreator(req.loggedInUser, createdService && createdService.serviceName);
      successResponse({ res, message: "Service created", data: createdService });
    })
    .catch(next);
};

const addServiceInEditAccessOfCreator = (loggedInUser, serviceName) => {
  return UserModel.findOneAndUpdate(
    { email: loggedInUser && loggedInUser.email },
    { $push: { editAccess: serviceName } }
  );
};
