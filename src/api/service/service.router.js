const express = require("express");

const { runValidators } = require("./service.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./service.get");
const postController = require("./service.post");
const putController = require("./service.put");
const deleteController = require("./service.delete");

const serviceRouter = express.Router();

// REQUESTS
serviceRouter.get("/", runValidators, getController.getServices);
serviceRouter.post("/", runValidators, postController.createService);
serviceRouter.put("/:mongoId", runValidators, putController.updateService);
serviceRouter.delete("/:mongoId", runValidators, deleteController.deleteService);

module.exports = serviceRouter;
