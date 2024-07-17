import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { popupServices } from "../services/popupServices.js";
const { findAllPopups, createAPopup, findPopup, findAndDelete } = popupServices;
import getDataUri from "../utils/dataUri.js";

export const getAllPopups = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const popups = await findAllPopups(keyword);

  return res.status(200).json({
    success: true,
    popups,
  });
});

export const createPopup = catchAsyncError(async (req, res, next) => {
  const { title, content, isActive, rating, offer } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newPopup = await createAPopup({
    title,
    content,
    isActive,
    rating,
    offer: JSON.parse(offer), // Ensure offer is an object
    thumbnailImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newPopup,
    message: "New popup created successfully.",
  });
});

export const getPopupById = catchAsyncError(async (req, res, next) => {
  const popup = await findPopup(req.params.popupId);
  if (!popup) {
    return next(new ErrorHandler("Popup not found.", 404));
  }

  return res.status(200).json({
    success: true,
    popup,
  });
});

export const deletePopup = catchAsyncError(async (req, res, next) => {
  const popup = await findPopup(req.params.popupId);
  if (!popup) {
    return next(new ErrorHandler("Popup not found.", 404));
  }

  // Delete files from Cloudinary
  await cloudinary.v2.uploader.destroy(popup.thumbnailImage.public_id);

  await findAndDelete(req.params.popupId);

  return res.status(200).json({
    success: true,
    message: "Popup deleted successfully.",
  });
});

export const updatePopup = catchAsyncError(async (req, res, next) => {
  const { title, content, isActive, rating, offer } = req.body;

  const popup = await findPopup(req.params.popupId);
  if (!popup) {
    return next(new ErrorHandler("Popup not found.", 404));
  }

  if (title) popup.title = title;
  if (content) popup.content = content;
  if (isActive !== undefined) popup.isActive = isActive;
  if (rating) popup.rating = rating;
  if (offer) popup.offer = JSON.parse(offer); // Ensure offer is an object

  // Update thumbnailImage if a new file is provided
  const file = req.file;
  if (file) {
    await cloudinary.v2.uploader.destroy(popup.thumbnailImage.public_id);
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    popup.thumbnailImage.public_id = myCloud.public_id;
    popup.thumbnailImage.url = myCloud.secure_url;
  }

  await popup.save();

  return res.status(200).json({
    success: true,
    message: "Popup updated successfully.",
    popup,
  });
});
