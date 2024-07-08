import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { categoryServices } from "../services/categoryServices.js";
const { findAllCategories, createACategory, findCategory, findAndDelete } =
  categoryServices;
import getDataUri from "../utils/dataUri.js";

export const getAllCategories = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";

  const categories = await findAllCategories(keyword);

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const addCategory = catchAsyncError(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newCategory = await createACategory({
    name,
    status,
    thumbnailImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newCategory,
    message: "New category created successfully.",
  });
});

export const deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await findCategory(req.params.categoryId);
  if (!category) {
    return next(new ErrorHandler("Category not found.", 404));
  }

  // Delete files from cloudinary
  await cloudinary.v2.uploader.destroy(category.thumbnailImage.public_id);

  await findAndDelete(req.params.categoryId);

  return res.status(200).json({
    success: true,
    message: "Post deleted by admin.",
  });
});

export const updateCategory = catchAsyncError(async (req, res, next) => {
  const { name, status } = req.body;

  const category = await findCategory(req.params.categoryId);
  if (!category) {
    return next(new ErrorHandler("Category not found.", 404));
  }

  if (name) category.name = name;
  if (status) category.status = status;

  // updating thumbnailImage
  await cloudinary.v2.uploader.destroy(category.thumbnailImage.public_id);

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  category.thumbnailImage.public_id = myCloud.public_id;
  category.thumbnailImage.url = myCloud.secure_url;

  category.save();

  return res.status(200).json({
    success: true,
    message: "Category updated successfully.",
    category,
  });
});
