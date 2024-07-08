import Express from "express";
import {
  login,
  logout,
  signup,
  // getMyProfile,
  // changePassword,
  // updateProfile,
  // updateProfilePicture,
  // forgetPassword,
  // resetPassword,
  // deleteMyProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()

  .post("/signup", singleUpload, signup)
  .post("/login", login)
  .get("/logout", logout)

// .get("/getMyProfile", isAuthenticated, getMyProfile)
// .put("/changePassword", isAuthenticated, changePassword)
// .put("/updateProfile", isAuthenticated, updateProfile)
// .put(
//   "/updateProfilePicture",
//   isAuthenticated,
//   singleUpload,
//   updateProfilePicture
// )
// .delete("/deleteMyProfile", isAuthenticated, deleteMyProfile)

// .post("/forgetPassword", forgetPassword)
// .put("/resetPassword/:token", resetPassword);
