const express = require("express");

const { runValidators } = require("./apisTree.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./apisTree.get");
const postController = require("./apisTree.post");
const putController = require("./apisTree.put");
const deleteController = require("./apisTree.delete");

const apisTreeRouter = express.Router();

// REQUESTS
apisTreeRouter.get("/", runValidators, getController.getApisTree);
apisTreeRouter.post("/", runValidators, postController.createFolder);
apisTreeRouter.put("/:mongoId", runValidators, putController.updateFolder);
apisTreeRouter.delete("/:mongoId", runValidators, deleteController.deleteFolder);

module.exports = apisTreeRouter;
