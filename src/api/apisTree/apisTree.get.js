const ApisTreeModel = require("../../models/apisTree.model");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to return apisTree
 */
module.exports.getApisTree = (req, res, next) => {
  const { serviceMID } = req.query;

  ApisTreeModel.find({ serviceMID })
    .then((apisTree) => {
      successResponse({ res, message: "API Tree", data: apisTree });
    })
    .catch(next);
};
