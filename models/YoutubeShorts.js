import mongoose from "mongoose";

const ytShrotsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  videoUrl: {
    type: String,
    required: true,
    match: [/(http|https):\/\/[^\s$.?#].[^\s]*/, "Please enter a valid URL"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const YoutubeShorts = mongoose.model("YoutubeShorts", ytShrotsSchema);
export default YoutubeShorts;
