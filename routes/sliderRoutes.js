import Express from "express";
import singleUpload from "../middlewares/multer.js";
import {
  createSliderImage,
  getAllSliderImages,
  updateSliderImage,
  deleteSliderImage,
} from "../controllers/sliderController.js";

export default Express.Router()
  .post("/createSliderImage", singleUpload, createSliderImage)
  .get("/getAllSliderImages", getAllSliderImages)
  .put("/updateSliderImage/:sliderId", singleUpload, updateSliderImage)
  .delete("/deleteSliderImage/:sliderId", deleteSliderImage);
