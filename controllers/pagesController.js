import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { pagesServices } from "../services/pagesServices.js";
const { findAllPages, createAPage, findPage, findAndDelete } = pagesServices;

export const getAllPages = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const pages = await findAllPages(keyword);

  return res.status(200).json({
    success: true,
    pages,
  });
});

export const savePage = catchAsyncError(async (req, res, next) => {
  const {
    title,
    content,
    metaKeywords,
    metaDescription,
    status,
    cloneForOtherLanguage,
  } = req.body;

  if (!title || !content || !metaKeywords || !metaDescription) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const newPage = await createAPage({
    title,
    content,
    metaKeywords,
    metaDescription,
    status,
    cloneForOtherLanguage,
  });

  return res.status(201).json({
    success: true,
    newPage,
    message: "New Page created successfully.",
  });
});

export const deletePage = catchAsyncError(async (req, res, next) => {
  const page = await findPage(req.params.pageId);
  if (!page) {
    return next(new ErrorHandler("Page not found.", 404));
  }

  await findAndDelete(req.params.pageId);

  return res.status(200).json({
    success: true,
    message: "Page deleted by admin.",
  });
});

export const updatePage = catchAsyncError(async (req, res, next) => {
  const {
    title,
    content,
    metaKeywords,
    metaDescription,
    status,
    cloneForOtherLanguage,
  } = req.body;

  const page = await findPage(req.params.pageId);
  if (!page) {
    return next(new ErrorHandler("Page not found.", 404));
  }

  if (title) page.title = title;
  if (content) page.content = content;
  if (metaKeywords) page.metaKeywords = metaKeywords;
  if (metaDescription) page.metaDescription = metaDescription;
  if (status) page.status = status;
  if (cloneForOtherLanguage) page.cloneForOtherLanguage = cloneForOtherLanguage;

  page.save();

  return res.status(200).json({
    success: true,
    message: "Page updated successfully.",
    page,
  });
});
