import Pages from "../models/Pages.js";

export const pagesServices = {
  findAllPages: async (keyword) => {
    return await Pages.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createAPage: async (insertObj) => {
    return await Pages.create(insertObj);
  },

  findPage: async (pageId) => {
    return await Pages.findById(pageId);
  },

  findAndDelete: async (pageId) => {
    return await Pages.findByIdAndDelete(pageId);
  },
};
