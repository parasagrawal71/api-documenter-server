/**
 * @description Function to return success response format
 */
module.exports.successResponse = ({ res, message, data }) => {
  const isProductionEnv = process.env.NODE_ENV === "production";

  const responseObj = {
    success: true,
    message,
    data,
  };

  appLogger.info({
    msg: `[RESPONSE] ${res.req.method} ${res.req.originalUrl.split("?")[0]} :`,
    info: responseObj,
    statusCode: 200,
  });

  return res.status(200).send(responseObj);
};

/* ############################################################################################################################################# */
// /**
//  * @description Function to get the exact filename and line number where error occured
//  */
// const getErrorOrigin = (error) => {
//   let errorOrigin = undefined;
//   const regex = /\((.*):(\d+):(\d+)\)$/
//   if (error && error.stack) {
//     const matchedFilepath = regex.exec(error.stack.split("\n") && error.stack.split("\n")[5]);
//     if(matchedFilepath) {
//       errorOrigin = `${matchedFilepath[1]}:${matchedFilepath[2]}:${matchedFilepath[3]}`
//     }
//   }

//   // console.log('errorOrigin ', errorOrigin);
//   return errorOrigin;
// }

/**
 * @description Function to return error including DB errors
 */
const handleError = (statusCode, e, message, rest) => {
  const isProductionEnv = process.env.NODE_ENV === "production";

  const errorStatusCode = statusCode || (e && e.status) || 500;
  const responseObj = {
    success: false,
    message: message || (e && e.message) || "Something went wrong in the server!!!",
    error: e,
    // errorOrigin: isProductionEnv ? undefined : getErrorOrigin(e),
    stack: isProductionEnv ? undefined : e && e.stack,
    ...rest,
  };

  // Validation Error
  if (e && e.name === "ValidationError" && e.errors && Object.keys(e.errors).length > 0) {
    return [400, responseObj];
  }

  // Duplicate value Error
  else if (e && e.name === "MongoError" && e.code === 11000) {
    const duplicatedKeys = e.keyPattern && Object.keys(e.keyPattern);
    responseObj.message = `Duplicate values for fields: [${duplicatedKeys}]`;
    return [400, responseObj];
  }

  // // CastError
  // else if (e && e.name === "CastError") {
  //   responseObj.message = "Wrong type!";
  //   return [400, responseObj];
  // }

  // ImmutableField
  else if (e && e.name === "MongoError" && e.code === 66) {
    responseObj.message = "Cannot modify the immutable field '_id'";
    return [400, responseObj];
  }

  // ECONNREFUSED
  else if (e && e.code === "ECONNREFUSED") {
    responseObj.message = "External service is unreachable";
    return [500, responseObj];
  }

  // OTHERS
  else {
    return [errorStatusCode, responseObj];
  }
};

/**
 * @description Function to return error response format
 */
module.exports.errorResponse = ({ res, statusCode, error, message, ...rest }) => {
  // Call handleError
  const [errorStatusCode, responseObj] = handleError(statusCode, error, message, rest);

  appLogger.error({
    msg: `[RESPONSE] ${res.req.method} ${res.req.originalUrl.split("?")[0]} :`,
    error: responseObj,
    statusCode: errorStatusCode,
  });

  return res.status(errorStatusCode).send(responseObj);
};
