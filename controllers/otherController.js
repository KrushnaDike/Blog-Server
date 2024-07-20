import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Contact from "../models/Contact.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, mobile, message } = req.body;
  if (!name || !email || !message || !mobile) {
    return next(new ErrorHandler("Please enter all fields.", 401));
  }

  const to = process.env.MY_EMAIL;
  const subject = "Contact from Brand Liberty";
  const text = `I am ${name} and my Email is ${email}. \n ${message}`;

  await sendEmail(to, subject, text);
  await Contact.create({ name, email, mobile, message });

  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});

export const getAllContacts = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact.find({});

  return res.status(200).json({
    success: true,
    contacts,
  });
});
