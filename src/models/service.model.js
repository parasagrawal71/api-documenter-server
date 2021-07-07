const mongoose = require("mongoose");

const { Schema } = mongoose;

// MAIN SCHEMA
const ServiceModel = new Schema(
  {
    serviceName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

ServiceModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

module.exports = mongoose.model("Service", ServiceModel, "services");
