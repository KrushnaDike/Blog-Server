import mongoose from "mongoose";

const pagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter post title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [100, "Title can exceed 100 characters"],
  },

  content: {
    type: String,
    required: true,
  },

  metaKeywords: {
    type: String,
    required: true,
  },

  metaDescription: {
    type: String,
    required: [true, "Please enter post description"],
    minLength: [20, "Description must be at least 20 characters"],
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },

  cloneForOtherLanguage: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pages = new mongoose.model("Pages", pagesSchema);

export default Pages;
