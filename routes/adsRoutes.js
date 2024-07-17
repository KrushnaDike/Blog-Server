import Express from "express";
import {
  createAd,
  deleteAd,
  getAllAds,
  getAdById,
  updateAd,
} from "../controllers/adsController.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  .get("/getAllAds", getAllAds)
  .get("/getAdById/:adId", getAdById)
  .post("/createAd", singleUpload, createAd)
  .put("/updateAd/:adId", singleUpload, updateAd)
  .delete("/deleteAd/:adId", deleteAd);
