import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { youtubeShortsServices } from "../services/ytShortsServices.js";
const {
  findAllYoutubeShorts,
  createAYoutubeShort,
  findYoutubeShort,
  findAndDelete,
} = youtubeShortsServices;

export const getAllYoutubeShorts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const youtubeShorts = await findAllYoutubeShorts(keyword);

  return res.status(200).json({
    success: true,
    youtubeShorts,
  });
});

export const createYoutubeShort = catchAsyncError(async (req, res, next) => {
  const { description, videoUrl } = req.body;

  if (!description || !videoUrl) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const newYoutubeShort = await createAYoutubeShort({
    description,
    videoUrl,
  });

  return res.status(201).json({
    success: true,
    newYoutubeShort,
    message: "New YouTube short added successfully.",
  });
});

export const deleteYoutubeShort = catchAsyncError(async (req, res, next) => {
  const youtubeShort = await findYoutubeShort(req.params.youtubeShortId);
  if (!youtubeShort) {
    return next(new ErrorHandler("YouTube short not found.", 404));
  }

  await findAndDelete(req.params.youtubeShortId);

  return res.status(200).json({
    success: true,
    message: "YouTube short deleted by admin.",
  });
});

export const updateYoutubeShort = catchAsyncError(async (req, res, next) => {
  const { description, videoUrl } = req.body;

  const youtubeShort = await findYoutubeShort(req.params.youtubeShortId);
  if (!youtubeShort) {
    return next(new ErrorHandler("YouTube short not found.", 404));
  }

  if (description) youtubeShort.description = description;
  if (videoUrl) youtubeShort.videoUrl = videoUrl;

  await youtubeShort.save();

  return res.status(200).json({
    success: true,
    message: "YouTube short updated successfully.",
    youtubeShort,
  });
});
