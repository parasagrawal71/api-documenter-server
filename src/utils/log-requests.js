module.exports.logIncomingRequests = (req, res, next) => {
  appLogger.request(req);
  next();
};
