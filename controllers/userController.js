import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { userServices } from "../services/userServices.js";
const { checkUserExists, createUser, findUser, fetchAllUsers, findAndDelete } =
  userServices;
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, role, password, permissions } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  const user = await checkUserExists(email);
  if (user) {
    return next(
      new ErrorHandler("User already exists with this email address", 400)
    );
  }

  const newUser = await createUser({
    name,
    email,
    role,
    password,
    permissions,
  });

  // SENDING CREDENTIALS
  const to = email;
  const subject = "CREDENTIALS - Ranjita's Blog";
  const text = `Hii ${name},

                Welcoming you to Ranjita's Blog, use below credentials to login at Ranjita's Blog

                Email: ${email}
                Password: ${password}
                
                Warning! Please don't share it with anybody keep it secret.`;

  await sendEmail(to, subject, text);

  return res.status(200).json({
    success: true,
    message: `${name} Registered successfully!`,
    newUser,
  });
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

  sendToken(res, user, `${user.role}, Logged In Successfully.`, 200);
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

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await findUser(req.userId);
  if (!user) {
    return next(new ErrorHandler("User dosen't exist.", 401));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await findUser(req.userId);
  if (!user) {
    return next(new ErrorHandler("Login first...", 401));
  }

  const users = await fetchAllUsers();
  if (!users || users.length == 0) {
    return next(new ErrorHandler("Users not found.", 401));
  }

  return res.status(200).json({
    success: true,
    users,
  });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { name, email, role, permissions } = req.body;

  const user = await findUser(req.userId);
  if (!user) {
    return next(new ErrorHandler("Login first...", 401));
  }

  const newUser = await findUser(req.params.userId);
  if (!newUser) {
    return next(new ErrorHandler("User not found.", 401));
  }

  if (user._id.toString() === newUser._id.toString()) {
    return next(new ErrorHandler("You can't update your own profile.", 401));
  }

  if (name) newUser.name = name;
  if (email) newUser.email = email;
  if (role) newUser.role = role;
  if (permissions) newUser.permissions = permissions;

  await newUser.save();

  return res.status(200).json({
    success: true,
    message: `${newUser.name}'s profile updated successfully.`,
    newUser,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await findUser(req.userId);
  if (!user) {
    return next(new ErrorHandler("Login first...", 401));
  }

  if (user._id.toString() === req.params.userId.toString()) {
    return next(new ErrorHandler("You can't delete yourself.", 401));
  }

  const deleteUser = await findAndDelete(req.params.userId);
  if (!deleteUser) {
    return next(new ErrorHandler("User not found.", 401));
  }

  return res.status(200).json({
    success: true,
    message: `User ${deleteUser.name} deleted by admin.`,
  });
});
