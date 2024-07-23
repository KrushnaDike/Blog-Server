import YoutubeShorts from "../models/YoutubeShorts.js";

export const youtubeShortsServices = {
  findAllYoutubeShorts: async () => {
    return await YoutubeShorts.find({});
  },

  createAYoutubeShort: async (insertObj) => {
    return await YoutubeShorts.create(insertObj);
  },

  findYoutubeShort: async (youtubeShortId) => {
    return await YoutubeShorts.findById(youtubeShortId);
  },

  findAndDelete: async (youtubeShortId) => {
    return await YoutubeShorts.findByIdAndDelete(youtubeShortId);
  },
};
