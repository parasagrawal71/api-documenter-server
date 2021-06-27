const ReadmeModel = require("../../models/readme.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return readme files list
 */
module.exports.getReadmeFiles = (req, res, next) => {
  const { serviceMID } = req.query;

  ReadmeModel.find({ serviceMID })
    .then((readmeFiles) => {
      successResponse({ res, message: "List of readme files", data: readmeFiles });
    })
    .catch(next);
};
