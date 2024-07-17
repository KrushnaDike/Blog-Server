import Ads from "../models/Ads.js";

export const adsServices = {
  findAllAds: async (keyword) => {
    return await Ads.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createAnAd: async (insertObj) => {
    return await Ads.create(insertObj);
  },

  findAd: async (adId) => {
    return await Ads.findById(adId);
  },

  findAndDelete: async (adId) => {
    return await Ads.findByIdAndDelete(adId);
  },
};
