import Express from "express";
import {
  createPopup,
  deletePopup,
  getAllPopups,
  getPopupById,
  updatePopup,
} from "../controllers/popupController.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  .get("/getAllPopups", getAllPopups)
  .get("/getPopupById/:popupId", getPopupById)
  .post("/createPopup", singleUpload, createPopup)
  .put("/updatePopup/:popupId", singleUpload, updatePopup)
  .delete("/deletePopup/:popupId", deletePopup);
