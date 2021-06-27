const SchemaModel = require("../../models/schema.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update schema by mongoId
 */
module.exports.updateSchema = (req, res, next) => {
  const { mongoId } = req.params;

  SchemaModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedSchema) => {
      if (!updatedSchema) {
        return errorResponse({ res, statusCode: 400, message: `Schema with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Schema with id ${mongoId} updated`, data: updatedSchema });
    })
    .catch(next);
};
