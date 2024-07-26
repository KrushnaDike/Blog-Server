import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter post title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [100, "Title can exceed 100 characters"],
  },

  category: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: [true, "Please enter post creator name"],
  },

  content: {
    type: String,
    required: true,
  },

  enquiryForm: {
    type: Boolean,
    default: false,
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

const Posts = new mongoose.model("Posts", postSchema);

export default Posts;
