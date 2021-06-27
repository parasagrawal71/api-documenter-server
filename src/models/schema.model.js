const mongoose = require("mongoose");

const { Schema } = mongoose;

// SUB-SCHEMAS
const fieldSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean },
    unique: { type: Boolean },
    regex: { type: String },
    description: { type: String },
  },
  { _id: false }
);

// MAIN SCHEMA
const SchemaModel = new Schema({
  fileName: { type: String, required: true, unique: true },
  fields: [fieldSchema],
  serviceMID: { type: String, required: true },
});

SchemaModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

module.exports = mongoose.model("Schema", SchemaModel, "schemas");
