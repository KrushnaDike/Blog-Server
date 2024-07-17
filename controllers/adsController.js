import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { adsServices } from "../services/adsServices.js";
const { findAllAds, createAnAd, findAd, findAndDelete } = adsServices;
import getDataUri from "../utils/dataUri.js";

export const getAllAds = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const ads = await findAllAds(keyword);

  return res.status(200).json({
    success: true,
    ads,
  });
});

export const createAd = catchAsyncError(async (req, res, next) => {
  const { title, link } = req.body;

  if (!title || !link) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newAd = await createAnAd({
    title,
    link,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newAd,
    message: "New ad created successfully.",
  });
});

export const getAdById = catchAsyncError(async (req, res, next) => {
  const ad = await findAd(req.params.adId);
  if (!ad) {
    return next(new ErrorHandler("Ad not found.", 404));
  }

  return res.status(200).json({
    success: true,
    ad,
  });
});

export const deleteAd = catchAsyncError(async (req, res, next) => {
  const ad = await findAd(req.params.adId);
  if (!ad) {
    return next(new ErrorHandler("Ad not found.", 404));
  }

  // Delete files from Cloudinary
  await cloudinary.v2.uploader.destroy(ad.image.public_id);

  await findAndDelete(req.params.adId);

  return res.status(200).json({
    success: true,
    message: "Ad deleted successfully.",
  });
});

export const updateAd = catchAsyncError(async (req, res, next) => {
  const { title, link } = req.body;

  const ad = await findAd(req.params.adId);
  if (!ad) {
    return next(new ErrorHandler("Ad not found.", 404));
  }

  if (title) ad.title = title;
  if (link) ad.link = link;

  // Update image if a new file is provided
  const file = req.file;
  if (file) {
    await cloudinary.v2.uploader.destroy(ad.image.public_id);
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    ad.image.public_id = myCloud.public_id;
    ad.image.url = myCloud.secure_url;
  }

  await ad.save();

  return res.status(200).json({
    success: true,
    message: "Ad updated successfully.",
    ad,
  });
});
