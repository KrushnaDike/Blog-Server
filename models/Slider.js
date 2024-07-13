import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter post title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [100, "Title can exceed 100 characters"],
  },

  thumbnailImage: {
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

const Sliders = new mongoose.model("Sliders", sliderSchema);

export default Sliders;
