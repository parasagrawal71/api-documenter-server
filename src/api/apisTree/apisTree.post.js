const ApisTreeModel = require("../../models/apisTree.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to create a folder
 */
module.exports.createFolder = (req, res, next) => {
  const folderObj = ApisTreeModel(req.body);
  folderObj
    .save()
    .then((createdFolder) => {
      successResponse({ res, message: "Folder created", data: createdFolder });
    })
    .catch(next);
};
