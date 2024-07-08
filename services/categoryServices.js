import Categories from "../models/Categories.js";

export const categoryServices = {
  findAllCategories: async (keyword) => {
    return await Categories.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createACategory: async (insertObj) => {
    return await Categories.create(insertObj);
  },

  findCategory: async (categoryId) => {
    return await Categories.findById(categoryId);
  },

  findAndDelete: async (categoryId) => {
    return await Categories.findByIdAndDelete(categoryId);
  },
};
