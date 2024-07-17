import Popup from "../models/Popup.js";

export const popupServices = {
  findAllPopups: async (keyword) => {
    return await Popup.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createAPopup: async (insertObj) => {
    return await Popup.create(insertObj);
  },

  findPopup: async (popupId) => {
    return await Popup.findById(popupId);
  },

  findAndDelete: async (popupId) => {
    return await Popup.findByIdAndDelete(popupId);
  },
};
