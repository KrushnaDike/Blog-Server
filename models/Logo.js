import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logoImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Logo = new mongoose.model("Logo", logoSchema);

export default Logo;
