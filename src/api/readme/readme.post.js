const ReadmeModel = require("../../models/readme.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a readme file
 */
module.exports.createReadmeFile = (req, res, next) => {
  const readmeFileObj = ReadmeModel(req.body);
  readmeFileObj
    .save()
    .then((createdReadmeFile) => {
      successResponse({ res, message: "Readme File created", data: createdReadmeFile });
    })
    .catch(next);
};
