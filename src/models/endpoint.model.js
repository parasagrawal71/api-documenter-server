const mongoose = require("mongoose");

const { Schema } = mongoose;

// SUB-SCHEMAS
const parameterSchema = new Schema(
  {
    name: { type: String },
    required: { type: Boolean },
    description: { type: String },
    value: { type: String },
  },
  { _id: false }
);

const requestHeaderSchema = new Schema(
  {
    name: { type: String },
    required: { type: Boolean },
    value: { type: String },
  },
  { _id: false }
);

const exampleSchema = new Schema(
  {
    title: { type: String },
    requestBody: { type: Object },
    parameters: [
      {
        name: { type: String },
        value: { type: String },
      },
      { _id: false },
    ],
    requestHeaders: [
      {
        name: { type: String },
        value: { type: String },
      },
      { _id: false },
    ],
    response: {
      statusCode: { type: Number },
      data: Schema.Types.Mixed,
    },
  },
  { _id: false }
);

// MAIN SCHEMA
const EndpointModel = new Schema(
  {
    title: { type: String, required: true, unique: true },
    method: { type: String, required: true },
    path: { type: String },
    description: { type: String },
    parameters: [parameterSchema],
    requestHeaders: [requestHeaderSchema],
    examples: [exampleSchema],
    serviceMID: { type: String, required: true },
  },
  { timestamps: true }
);

EndpointModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

module.exports = mongoose.model("Endpoint", EndpointModel, "endpoints");
