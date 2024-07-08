import User from "../models/User.js";

export const userServices = {
  createUser: async (insertObj) => {
    return await User.create(insertObj);
  },

  checkUserExists: async (email) => {
    return await User.findOne({ email }).select("+password");
  },

  deleteMe: async (userId) => {
    return await User.findByIdAndDelete(userId);
  },

  findUser: async (userId) => {
    return await User.findById(userId).select("+password");
  },

  checkUserExistsWithResetToken: async (resetPasswordToken) => {
    return await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    }).select("+password");
  },
};
