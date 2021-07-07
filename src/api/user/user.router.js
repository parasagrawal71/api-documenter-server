const express = require("express");

const { runValidators } = require("./user.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./user.get");
const postController = require("./user.post");
const putController = require("./user.put");
const deleteController = require("./user.delete");

const userRouter = express.Router();

// REQUESTS
userRouter.get("/", runValidators, getController.getUsers);
userRouter.get("/:mongoId", runValidators, getController.getUserById);
userRouter.post("/", runValidators, postController.createUser);
userRouter.put("/:mongoId", runValidators, putController.updateUser);
userRouter.delete("/:mongoId", runValidators, deleteController.deleteUser);

module.exports = userRouter;
