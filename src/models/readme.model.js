const mongoose = require("mongoose");

const { Schema } = mongoose;

// MAIN SCHEMA
const ReadmeModel = new Schema({
  fileName: { type: String, required: true, unique: true },
  content: { type: String },
  serviceMID: { type: String, required: true },
});

ReadmeModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

module.exports = mongoose.model("Readme", ReadmeModel, "readme");
