import QuickLinks from "../models/QuickLinks.js";

export const quicklinksServices = {
  findAllQuickLinks: async (keyword) => {
    return await QuickLinks.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createAQuickLink: async (insertObj) => {
    return await QuickLinks.create(insertObj);
  },

  findQuickLink: async (quickLinkId) => {
    return await QuickLinks.findById(quickLinkId);
  },

  findAndDelete: async (quickLinkId) => {
    return await QuickLinks.findByIdAndDelete(quickLinkId);
  },
};
