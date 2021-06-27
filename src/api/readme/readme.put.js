const ReadmeModel = require("../../models/readme.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update readme file by mongoId
 */
module.exports.updateReadmeFile = (req, res, next) => {
  const { mongoId } = req.params;

  ReadmeModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedReadmeFile) => {
      if (!updatedReadmeFile) {
        return errorResponse({ res, statusCode: 400, message: `Readme file with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Readme file with id ${mongoId} updated`, data: updatedReadmeFile });
    })
    .catch(next);
};
