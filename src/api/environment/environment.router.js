const express = require("express");

const { runValidators } = require("./environment.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./environment.get");
const postController = require("./environment.post");
const putController = require("./environment.put");
const deleteController = require("./environment.delete");

const environmentRouter = express.Router();

// REQUESTS
environmentRouter.get("/", runValidators, getController.getEnvironments);
environmentRouter.post("/", runValidators, postController.createEnvironment);
environmentRouter.put("/:mongoId", runValidators, putController.updateEnvironment);
environmentRouter.delete("/:mongoId", runValidators, deleteController.deleteEnvironment);

module.exports = environmentRouter;
