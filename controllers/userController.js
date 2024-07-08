import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { userServices } from "../services/userServices.js";
const { checkUserExists, createUser } = userServices;
import { sendToken } from "../utils/sendToken.js";

export const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  const user = await checkUserExists(email);
  if (user) {
    return next(
      new ErrorHandler("User already exists with this email address", 400)
    );
  }

  //   Upload file on cloudinary
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const newUser = await createUser({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(res, newUser, "Registered Successfully.", 200);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await checkUserExists(email);
  if (!user) {
    return next(new ErrorHandler("User dosen't exist.", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect email or password.", 401));
  }

  sendToken(res, user, `${user.name}, Logged In Successfully.`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "Development" ? false : true,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});
