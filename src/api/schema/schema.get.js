const SchemaModel = require("../../models/schema.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return schemas list
 */
module.exports.getSchemas = (req, res, next) => {
  const { serviceMID } = req.query;

  SchemaModel.find({ serviceMID })
    .then((schemas) => {
      successResponse({ res, message: "List of schemas", data: schemas });
    })
    .catch(next);
};
