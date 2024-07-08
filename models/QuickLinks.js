import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuickLinks = new mongoose.model("QuickLinks", quickLinkSchema);

export default QuickLinks;
