const express = require("express");

const { runValidators } = require("./schema.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./schema.get");
const postController = require("./schema.post");
const putController = require("./schema.put");
const deleteController = require("./schema.delete");

const schemaRouter = express.Router();

// REQUESTS
schemaRouter.get("/", runValidators, getController.getSchemas);
schemaRouter.post("/", runValidators, postController.createSchema);
schemaRouter.put("/:mongoId", runValidators, putController.updateSchema);
schemaRouter.delete("/:mongoId", runValidators, deleteController.deleteSchema);

module.exports = schemaRouter;
