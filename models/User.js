import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be 6 characters"],
    select: false,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  permissions: {
    type: [String],
    enum: [
      "Slider",
      "PostManagement",
      "CustomPages",
      "Footer",
      "UserManagement",
      "UserMessages",
    ],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

const User = new mongoose.model("User", userSchema);

export default User;
