import Sliders from "../models/Slider.js";

export const sliderServices = {
  findAllSliderImages: async (keyword) => {
    return await Sliders.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    });
  },

  createASliderImage: async (insertObj) => {
    return await Sliders.create(insertObj);
  },

  findSliderImage: async (sliderId) => {
    return await Sliders.findById(sliderId);
  },

  findAndDelete: async (sliderId) => {
    return await Sliders.findByIdAndDelete(sliderId);
  },
};
