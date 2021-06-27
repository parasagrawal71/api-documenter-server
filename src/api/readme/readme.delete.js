const ReadmeModel = require("../../models/readme.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete readme file by mongoId
 */
module.exports.deleteReadmeFile = (req, res, next) => {
  const { mongoId } = req.params;

  ReadmeModel.findOneAndDelete({ _id: mongoId })
    .then((deletedReadmeFile) => {
      if (!deletedReadmeFile) {
        return errorResponse({ res, statusCode: 400, message: `Readme file with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Readme file with id ${mongoId} deleted`, data: deletedReadmeFile });
    })
    .catch(next);
};
