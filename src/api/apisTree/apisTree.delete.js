const ApisTreeModel = require("../../models/apisTree.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to delete folder by mongoId
 */
module.exports.deleteFolder = (req, res, next) => {
  const { mongoId } = req.params;

  ApisTreeModel.findOneAndDelete({ _id: mongoId })
    .then((deletedFolder) => {
      if (!deletedFolder) {
        return errorResponse({ res, statusCode: 400, message: `Folder with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Folder with id ${mongoId} deleted`, data: deletedFolder });
    })
    .catch(next);
};
