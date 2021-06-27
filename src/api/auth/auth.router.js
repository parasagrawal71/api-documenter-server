const express = require("express");

const { runValidators } = require("./auth.validator");

// IMPORT CONTROLLERS HERE
const getController = require("./auth.get");
const postController = require("./auth.post");
const patchController = require("./auth.patch");

const authRouter = express.Router();

// REQUESTS
authRouter.get("/login", runValidators, getController.login);
authRouter.get("/google-login", runValidators, getController.googleLogin);
authRouter.get("/account-verification", runValidators, getController.accountVerification);
authRouter.post("/register", runValidators, postController.register);
authRouter.patch("/set-password", runValidators, patchController.setPassword);
authRouter.patch("/forgot-password", runValidators, patchController.handleForgotPassword);
authRouter.patch("/verify-email", runValidators, patchController.verifyEmailAdress);

module.exports = authRouter;
