const SchemaModel = require("../../models/schema.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a schema
 */
module.exports.createSchema = (req, res, next) => {
  const schemaObj = SchemaModel(req.body);
  schemaObj
    .save()
    .then((createdSchema) => {
      successResponse({ res, message: "Schema created", data: createdSchema });
    })
    .catch(next);
};
