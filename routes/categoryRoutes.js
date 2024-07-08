import Express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  .post("/addCategory", singleUpload, addCategory)
  .get("/getAllCategories", getAllCategories)
  .put("/updateCategory/:categoryId", singleUpload, updateCategory)
  .delete("/deleteCategory/:categoryId", deleteCategory);
