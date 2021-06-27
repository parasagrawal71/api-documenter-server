const SchemaModel = require("../../models/schema.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete schema by mongoId
 */
module.exports.deleteSchema = (req, res, next) => {
  const { mongoId } = req.params;

  SchemaModel.findOneAndDelete({ _id: mongoId })
    .then((deletedSchema) => {
      if (!deletedSchema) {
        return errorResponse({ res, statusCode: 400, message: `Schema with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Schema with id ${mongoId} deleted`, data: deletedSchema });
    })
    .catch(next);
};
