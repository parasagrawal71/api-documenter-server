const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

// SUB-SCHEMAS
// const editAccessSchema = new Schema(
//   {
//     serviceName: { type: String, required: true },
//     serviceMID: { type: String, required: true },
//   },
//   { _id: false, id: false, toJSON: { virtuals: true } }
// );

// editAccessSchema.virtual("_id").get(function () {
//   return this.serviceMID;
// });

// MAIN SCHEMA
const UserModel = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    superuser: { type: Boolean, default: false },
    editAccess: [{ type: String }],
  },
  { timestamps: true }
);

UserModel.pre("findOneAndUpdate", async function (next) {
  this.options.runValidators = true;
  this.options.new = true;

  if (this._update && this._update.password) {
    const passwordHash = await bcrypt.hash(this._update.password, 10);
    this._update.password = passwordHash;
  }

  if (this._update && this._update.otp) {
    const otpHash = await bcrypt.hash(String(this._update.otp), 10);
    this._update.otp = otpHash;
  }

  next();
});

UserModel.pre("save", async function (next) {
  if (this.password) {
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash;
  }

  if (this.otp) {
    const otpHash = await bcrypt.hash(String(this.otp), 10);
    this.otp = otpHash;
  }

  next();
});

UserModel.methods.isValidPassword = async function (password) {
  const user = this;
  const comparision = await bcrypt.compare(password, user.password);

  return comparision;
};

UserModel.methods.isValidOtp = async function (otp) {
  const user = this;
  const comparision = await bcrypt.compare(String(otp), user.otp);

  return comparision;
};

module.exports = mongoose.model("User", UserModel, "users");
