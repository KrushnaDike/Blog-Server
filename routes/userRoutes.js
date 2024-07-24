import Express from "express";
import {
  login,
  logout,
  signup,
  getMyProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { isAuthenticated, authorizedAdmin } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()

  .post("/signup", signup)
  .post("/login", login)
  .get("/logout", logout)
  .get("/getMyProfile", isAuthenticated, getMyProfile)
  .get("/getAllUsers", isAuthenticated, authorizedAdmin, getAllUsers)
  .put(
    "/updateUser/:userId",
    isAuthenticated,
    authorizedAdmin,
    updateUser
  )
  .delete("/deleteUser/:userId", isAuthenticated, authorizedAdmin, deleteUser);
