import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { quicklinksServices } from "../services/quicklinksServices.js";
const { findAllQuickLinks, createAQuickLink, findQuickLink, findAndDelete } =
  quicklinksServices;

export const getAllQuickLinks = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const quickLinks = await findAllQuickLinks(keyword);

  return res.status(200).json({
    success: true,
    quickLinks,
  });
});

export const createQuickLink = catchAsyncError(async (req, res, next) => {
  const { title, language, url } = req.body;

  if (!title || !language || !url) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const newQuickLink = await createAQuickLink({
    title,
    language,
    url,
  });

  return res.status(201).json({
    success: true,
    newQuickLink,
    message: "New quick link added successfully.",
  });
});

export const deleteQuickLink = catchAsyncError(async (req, res, next) => {
  const quickLink = await findQuickLink(req.params.quickLinkId);
  if (!quickLink) {
    return next(new ErrorHandler("Quick Link not found.", 404));
  }

  await findAndDelete(req.params.quickLinkId);

  return res.status(200).json({
    success: true,
    message: "Quick Link deleted by admin.",
  });
});

export const updateQuickLink = catchAsyncError(async (req, res, next) => {
  const { title, language, url } = req.body;

  const quickLink = await findQuickLink(req.params.quickLinkId);
  if (!quickLink) {
    return next(new ErrorHandler("Quick Link not found.", 404));
  }

  if (title) quickLink.title = title;
  if (language) quickLink.language = language;
  if (url) quickLink.url = url;

  quickLink.save();

  return res.status(200).json({
    success: true,
    message: "Quick Link updated successfully.",
    quickLink,
  });
});
