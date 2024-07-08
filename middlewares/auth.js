import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { userServices } from "../services/userServices.js";
const { findUser } = userServices;

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("User not logged in..", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await findUser(decoded._id);
  req.userId = decoded._id;

  next();
});

export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource.`
      )
    );
  }

  next();
};
