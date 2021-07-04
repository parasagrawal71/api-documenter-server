const express = require("express");

// IMPORT CONTROLLERS HERE
const allController = require("./dev.all");

const devRouter = express.Router();

// REQUESTS
devRouter.post("/encrypt", allController.encryptData);
devRouter.post("/decrypt", allController.decryptData);

module.exports = devRouter;
