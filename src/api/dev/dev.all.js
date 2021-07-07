const CryptoJS = require("crypto-js");
const { ENCRYPTION_KEY } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/response.format");

/**
 * @description Function to encrypt the data
 */
module.exports.encryptData = (req, res, next) => {
  try {
    if (!req.body || !req.body.data) {
      return errorResponse({ res, statusCode: 400, message: `'data' parameter is required in the request body` });
    }

    const encryptedData = CryptoJS.AES.encrypt(req.body.data, ENCRYPTION_KEY).toString();

    return successResponse({ res, message: `Encrypted data`, data: encryptedData });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Function to decrypt the data
 */
module.exports.decryptData = (req, res, next) => {
  try {
    if (!req.body || !req.body.data) {
      return errorResponse({ res, statusCode: 400, message: `'data' parameter is required in the request body` });
    }

    const bytes = CryptoJS.AES.decrypt(req.body.data, ENCRYPTION_KEY);
    const decryptedData = bytes && bytes.toString(CryptoJS.enc.Utf8);

    return successResponse({ res, message: `Decrypted data`, data: decryptedData });
  } catch (error) {
    next(error);
  }
};
