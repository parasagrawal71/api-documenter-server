require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  // MAILs
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  DEFAULT_SENDER: "parasagrawal71@gmail.com", // "no-reply@api-documenter.com"

  // GOOGLE SIGNIN
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // URLs
  HOST_URL: isProduction ? "https://api-documenter-server.herokuapp.com/api/v1" : "http://localhost:5001/api/v1",
};
