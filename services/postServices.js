import Posts from "../models/Posts.js";

export const postServices = {
  findAllPosts: async (keyword, category) => {
    return await Posts.find({
      title: {
        $regex: keyword,
        $options: "i",
      },

      category: {
        $regex: category,
        $options: "i",
      },
    });
  },

  findRecentPosts: async () => {
    return await Posts.find().sort({ createdAt: -1 }).limit(4);
  },

  createAPost: async (insertObj) => {
    return await Posts.create(insertObj);
  },

  findPost: async (postId) => {
    return await Posts.findById(postId);
  },

  findAndDelete: async (postId) => {
    return await Posts.findByIdAndDelete(postId);
  },
};
