const ServiceModel = require("../../models/service.model");
const { errorResponse } = require("../../utils/response.format");
const { isEmptyObject, isEmptyArray } = require("../../utils/functions");

module.exports.runValidators = (req, res, next) => {
  let validatedModel = null;

  switch (req.method) {
    case "GET":
      next();
      break;

    case "POST":
      if (!req.body || (isEmptyObject(req.body) && isEmptyArray(req.body))) {
        return errorResponse({ res, statusCode: 400, message: "Body is required" });
      }

      validatedModel = ServiceModel(req.body).validateSync();
      if (validatedModel instanceof Error) {
        return errorResponse({
          res,
          statusCode: 400,
          message: validatedModel && validatedModel.message,
          error: validatedModel,
        });
      }

      next();
      break;

    case "PUT":
      if (!req.body || (isEmptyObject(req.body) && isEmptyArray(req.body))) {
        return errorResponse({ res, statusCode: 400, message: "Body is required" });
      }

      validatedModel = ServiceModel(req.body).validateSync();
      if (validatedModel instanceof Error) {
        return errorResponse({
          res,
          statusCode: 400,
          message: validatedModel && validatedModel.message,
          error: validatedModel,
        });
      }

      next();
      break;

    case "DELETE":
      next();
      break;

    default:
      next();
  }
};
