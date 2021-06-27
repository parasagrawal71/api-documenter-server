const mongoose = require("mongoose");

const { Schema } = mongoose;

// SUB-SCHEMAS
const FilesSchema = new Schema(
  {
    fileName: { type: String, required: true },
    method: { type: String, required: true },
    endpointMID: { type: String, required: true },
  },
  { _id: false }
);

const SubOrderSchema = new Schema(
  {
    folderName: { type: String, required: true },
    files: [FilesSchema],
  },
  { _id: false }
);

// MAIN SCHEMA
const ApisTreeModel = new Schema({
  folderName: { type: String, required: true, unique: true },
  subfolders: [SubOrderSchema],
  files: [FilesSchema],
  serviceMID: { type: String, required: true },
});

ApisTreeModel.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
});

module.exports = mongoose.model("ApisTree", ApisTreeModel, "apisTree");
