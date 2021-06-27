const express = require("express");

const { runValidators } = require("./endpoint.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./endpoint.get");
const postController = require("./endpoint.post");
const putController = require("./endpoint.put");
const deleteController = require("./endpoint.delete");

const endpointRouter = express.Router();

// REQUESTS
endpointRouter.get("/", runValidators, getController.getEndpoints);
endpointRouter.get("/:mongoId", runValidators, getController.getEndpointById);
endpointRouter.post("/", runValidators, postController.createEndpoint);
endpointRouter.put("/:mongoId", runValidators, putController.updateEndpoint);
endpointRouter.delete("/multiple", runValidators, deleteController.deleteMultipleEndpoints);
endpointRouter.delete("/:mongoId", runValidators, deleteController.deleteEndpoint);

module.exports = endpointRouter;
