import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Contact from "../models/Contact.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { logoServices } from "../services/logoServices.js";
import { request } from "express";
import Enquiry from "../models/Enquiry.js";
const { findAllLogos, createALogo, findLogo } = logoServices;

import { postServices } from "../services/postServices.js";
const { findPost } = postServices;

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, mobile, message } = req.body;
  if (!name || !email || !message || !mobile) {
    return next(new ErrorHandler("Please enter all fields.", 401));
  }

  const to = process.env.MY_EMAIL;
  const subject = "Contact from Brand Liberty";
  const text = `I am ${name} and my Email is ${email}. \n 
                Message: ${message}`;

  await sendEmail(to, subject, text);
  await Contact.create({ name, email, mobile, message });

  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});

export const enquiryMsg = catchAsyncError(async (req, res, next) => {
  const { name, email, mobile, message } = req.body;
  if (!name || !email || !message || !mobile) {
    return next(new ErrorHandler("Please enter all fields.", 401));
  }

  const post = await findPost(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found.", 404));
  }
  
  const enquiry = await Enquiry.create({
    name,
    email,
    mobile,
    message,
    postId: post._id,
    postName: post.title,
  });

  const to = process.env.MY_EMAIL;
  const subject = `Enquiry from ${name} about ${post.title}`;
  const text = `I am ${name} and my Email is ${email}. \n Enquiry Message: ${message}`;
  
  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
    enquiry,
  });
});

export const getAllEnquiries = catchAsyncError(async (req, res, next) => {
  const enquiries = await Enquiry.find({});

  return res.status(200).json({
    success: true,
    enquiries,
  });
});

export const getAllContacts = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact.find({});

  return res.status(200).json({
    success: true,
    contacts,
  });
});

export const createLogo = catchAsyncError(async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return res.json({
      sucess: false,
      message: "Please select file first",
    });
  }

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  console.log(myCloud);

  const newLogo = await createALogo({
    logoImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  return res.status(201).json({
    success: true,
    newLogo,
    message: "New Logo created successfully.",
  });
});

export const updateLogo = catchAsyncError(async (req, res, next) => {
  const logo = await findLogo("66a0d362b07641cbdd18c752");
  if (!logo) {
    return next(new ErrorHandler("Logo not found.", 404));
  }

  // updating thumbnailImage
  await cloudinary.v2.uploader.destroy(logo.logoImage.public_id);

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  logo.logoImage.public_id = myCloud.public_id;
  logo.logoImage.url = myCloud.secure_url;

  logo.save();
  return res.status(200).json({
    success: true,
    message: "Logo updated successfully.",
    logo,
  });
});

export const getLogo = catchAsyncError(async (req, res, next) => {
  const logo = await findLogo("66a0d362b07641cbdd18c752");

  return res.status(200).json({
    success: true,
    logo,
  });
});
