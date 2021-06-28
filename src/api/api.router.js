const express = require("express");
const { authenticateRequests } = require("../utils/authenticate-requests");

// IMPORT OF ROUTER TO ALL RESOURCES
const endpointRouter = require("./endpoint/endpoint.router");
const apisTreeRouter = require("./apisTree/apisTree.router");
const schemaRouter = require("./schema/schema.router");
const readmeRouter = require("./readme/readme.router");
const serviceRouter = require("./service/service.router");
const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");

const apiRouter = express.Router();

// ROUTER TO ALL RESOURCES
apiRouter.use("/endpoint", authenticateRequests, endpointRouter);
apiRouter.use("/apisTree", authenticateRequests, apisTreeRouter);
apiRouter.use("/schema", authenticateRequests, schemaRouter);
apiRouter.use("/readme", authenticateRequests, readmeRouter);
apiRouter.use("/service", authenticateRequests, serviceRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", authenticateRequests, userRouter);

module.exports = apiRouter;
