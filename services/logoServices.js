import Logo from "../models/Logo.js";

export const logoServices = {
  findAllLogos: async () => {
    return await Logo.find({});
  },

  findLogo: async (logoId) => {
    return await Logo.findById(logoId);
  },

  createALogo: async (insertObj) => {
    return await Logo.create(insertObj);
  },
};
