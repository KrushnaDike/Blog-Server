import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { postServices } from "../services/postServices.js";
const { findAllPosts, createAPost, findPost, findAndDelete, findRecentPosts } =
  postServices;
import getDataUri from "../utils/dataUri.js";

export const getAllPosts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const posts = await findAllPosts(keyword, category);

  return res.status(200).json({
    success: true,
    posts,
  });
});

export const createPost = catchAsyncError(async (req, res, next) => {
  const { title, category, author, content, metaKeywords, metaDescription } =
    req.body;

  if (
    !title ||
    !category ||
    !author ||
    !content ||
    !metaKeywords ||
    !metaDescription
  ) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newPost = await createAPost({
    title,
    category,
    author,
    content,
    metaDescription,
    metaKeywords,
    thumbnailImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newPost,
    message: "New post created successfully.",
  });
});

export const getPostById = catchAsyncError(async (req, res, next) => {
  const post = await findPost(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found.", 404));
  }

  return res.status(200).json({
    success: true,
    post,
  });
});

export const deletePost = catchAsyncError(async (req, res, next) => {
  const post = await findPost(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found.", 404));
  }

  // Delete files from cloudinary
  await cloudinary.v2.uploader.destroy(post.thumbnailImage.public_id);

  await findAndDelete(req.params.postId);

  return res.status(200).json({
    success: true,
    message: "Post deleted by admin.",
  });
});

export const updatePost = catchAsyncError(async (req, res, next) => {
  const { title, category, author, content, metaKeywords, metaDescription } =
    req.body;

  const post = await findPost(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found.", 404));
  }

  if (title) post.title = title;
  if (category) post.category = category;
  if (author) post.author = author;
  if (content) post.content = content;
  if (metaKeywords) post.metaKeywords = metaKeywords;
  if (metaDescription) post.metaDescription = metaDescription;

  // updating thumbnailImage
  await cloudinary.v2.uploader.destroy(post.thumbnailImage.public_id);

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  post.thumbnailImage.public_id = myCloud.public_id;
  post.thumbnailImage.url = myCloud.secure_url;

  post.save();

  return res.status(200).json({
    success: true,
    message: "Post updated successfully.",
    post,
  });
});

export const getRecentPosts = catchAsyncError(async (req, res, next) => {
  const recentPosts = await findRecentPosts();

  return res.status(200).json({
    success: true,
    recentPosts,
  });
});
