import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { sliderServices } from "../services/sliderServices.js";
const {
  findAllSliderImages,
  createASliderImage,
  findSliderImage,
  findAndDelete,
} = sliderServices;
import getDataUri from "../utils/dataUri.js";

export const getAllSliderImages = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const sliderImages = await findAllSliderImages(keyword);

  return res.status(200).json({
    success: true,
    sliderImages,
  });
});

export const createSliderImage = catchAsyncError(async (req, res, next) => {
  const { title } = req.body;
  const file = req.file;

  if (!title || !file) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  //   uploading image
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newSliderImage = await createASliderImage({
    title,
    thumbnailImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newSliderImage,
    message: "New slider image added successfully.",
  });
});

export const deleteSliderImage = catchAsyncError(async (req, res, next) => {
  const sliderImage = await findSliderImage(req.params.sliderId);
  if (!sliderImage) {
    return next(new ErrorHandler("Slider image not found.", 404));
  }

  // Delete files from cloudinary
  await cloudinary.v2.uploader.destroy(sliderImage.thumbnailImage.public_id);

  await findAndDelete(req.params.sliderId);

  return res.status(200).json({
    success: true,
    message: "Slider image deleted by admin.",
  });
});

export const updateSliderImage = catchAsyncError(async (req, res, next) => {
  const { title } = req.body;

  const sliderImage = await findSliderImage(req.params.sliderId);
  if (!sliderImage) {
    return next(new ErrorHandler("Slider image not found.", 404));
  }

  if (title) sliderImage.title = title;

  // updating thumbnailImage
  await cloudinary.v2.uploader.destroy(sliderImage.thumbnailImage.public_id);

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  sliderImage.thumbnailImage.public_id = myCloud.public_id;
  sliderImage.thumbnailImage.url = myCloud.secure_url;

  sliderImage.save();

  return res.status(200).json({
    success: true,
    message: "Slider Image updated successfully.",
    sliderImage,
  });
});
