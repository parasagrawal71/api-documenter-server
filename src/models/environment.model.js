const mongoose = require("mongoose");

const { Schema } = mongoose;

// SUB-SCHEMAS
const variableSchema = new Schema(
  {
    key: { type: String, required: true },
    value: { type: String },
  },
  { _id: false }
);

// MAIN SCHEMA
const EnvironmentModel = new Schema(
  {
    envName: { type: String, required: true, unique: true },
    variables: [variableSchema],
    serviceMID: { type: String, required: true },
  },
  { timestamps: true }
);

EnvironmentModel.pre("findOneAndUpdate", async function (next) {
  this.options.runValidators = true;
  this.options.new = true;

  next();
});

module.exports = mongoose.model("Environment", EnvironmentModel, "environments");
