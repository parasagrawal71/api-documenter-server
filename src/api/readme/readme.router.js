const express = require("express");

const { runValidators } = require("./readme.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./readme.get");
const postController = require("./readme.post");
const putController = require("./readme.put");
const deleteController = require("./readme.delete");

const readmeRouter = express.Router();

// REQUESTS
readmeRouter.get("/", runValidators, getController.getReadmeFiles);
readmeRouter.post("/", runValidators, postController.createReadmeFile);
readmeRouter.put("/:mongoId", runValidators, putController.updateReadmeFile);
readmeRouter.delete("/:mongoId", runValidators, deleteController.deleteReadmeFile);

module.exports = readmeRouter;
