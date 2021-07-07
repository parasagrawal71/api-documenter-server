const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const chalk = require("chalk");
const rTracer = require("cls-rtracer");
const helmet = require("helmet");
const path = require("path");

const apiRouter = require("./api/api.router");
const { logIncomingRequests } = require("./utils/log-requests");
const { errorResponse } = require("./utils/response.format");
const { getHttpMessage } = require("./utils/http-constants");
const { connectDatabase } = require("./utils/db.connect");
const { APP_NAME } = require("./config");
require("./utils/app-logger");
require("./middlewares/passport");

const app = express();
const PORT = process.env.PORT || 5001;

/*
 *
 * ******************************************** Prerequisites *********************************************** //
 */
connectDatabase(app);
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(rTracer.expressMiddleware());
app.use(helmet());
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
// app.use(
//   morgan(function (tokens, req, res) {
//     let statusCode = tokens.status(req, res);
//     if(statusCode.startsWith(4) || statusCode.startsWith(5)) {
//       statusCode = chalk.red(statusCode);
//     } else {
//       statusCode = chalk.green(statusCode);
//     }

//     return [
//       `[${moment().format("DD/MM/YYYY hh:mm:ss A")}]`,
//       chalk.blue('[REQUEST] '),
//       tokens.method(req, res),
//       tokens.url(req, res),
//       ":",
//       statusCode,
//       getHttpMessage(tokens.status(req, res)),
//       "-",
//       req.hostname,
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   })
// );

/*
 *
 * ****************************************** Routers and Routes ******************************************** //
 */
app.use("/api/v1", logIncomingRequests, apiRouter);

app.get("/health", logIncomingRequests, (req, res) => {
  res.send("Active");
});

app.get("/", logIncomingRequests, (req, res) => {
  res.send(`Welcome to ${APP_NAME} Server!`);
});

app.all("/*", (req, res) => {
  errorResponse({ res, statusCode: 404, message: `Can't find ${req.method} ${req.originalUrl} on the server!` });
});

/*
 *
 * ************************************* Process Events and Error handling ********************************** //
 */
app.use((error, req, res, next) => {
  // Error Middleware:
  // err, req, res, and next. As long as we have these four arguments,
  // Express will recognize the middleware as an error handling middleware.
  errorResponse({ res, error });
});

process.on("unhandledRejection", (promise, reason) => {
  appLogger.error("------------------------ unhandledRejection Error ----------------------");
  appLogger.error({ msg: `Unhandled Rejection at: ${promise}; reason: ${reason}` });
  appLogger.error("------------------------------------------------------------------------");
});

process.on("uncaughtException", (error, origin) => {
  appLogger.error("------------------------ uncaughtException Error -----------------------");
  appLogger.error({ msg: `uncaughtException error @ ${origin}`, error });
  appLogger.error("------------------------------------------------------------------------");
});

function signalProcessCallback(signal) {
  appLogger.debug(`Server closed by ${signal === "SIGTERM" ? "killing Process" : "pressing Ctrl+C"}`);
}

process.on("SIGINT", signalProcessCallback);
process.on("SIGTERM", signalProcessCallback);

app.on("ready", () => {
  app.listen(PORT, () => {
    appLogger.debug(`${APP_NAME} Server is running on ${PORT}`);
  });
});
