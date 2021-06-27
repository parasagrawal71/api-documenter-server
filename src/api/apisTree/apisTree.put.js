const ApisTreeModel = require("../../models/apisTree.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to update folder by mongoId
 */
module.exports.updateFolder = (req, res, next) => {
  const { mongoId } = req.params;

  ApisTreeModel.findOneAndUpdate({ _id: mongoId }, req.body)
    .then((updatedFolder) => {
      if (!updatedFolder) {
        return errorResponse({ res, statusCode: 400, message: `Folder with id ${mongoId} NOT found` });
      }

      successResponse({ res, message: `Folder with id ${mongoId} updated`, data: updatedFolder });
    })
    .catch(next);
};
