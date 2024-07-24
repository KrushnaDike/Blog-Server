import Express from "express";
import {
  contact,
  createLogo,
  getAllContacts,
  getLogo,
  updateLogo,
} from "../controllers/otherController.js";
import {
  createYoutubeShort,
  deleteYoutubeShort,
  getAllYoutubeShorts,
  updateYoutubeShort,
} from "../controllers/ytShortsControlle.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  .post("/contact", contact)
  .get("/getAllContacts", getAllContacts)

  .post("/createYoutubeShort", createYoutubeShort)
  .get("/getAllYoutubeShorts", getAllYoutubeShorts)
  .put("/updateYoutubeShort/:youtubeShortId", updateYoutubeShort)
  .delete("/deleteYoutubeShort/:youtubeShortId", deleteYoutubeShort)

  .post("/createLogo", singleUpload, createLogo)
  .get("/getLogo", getLogo)
  .put("/updateLogo", singleUpload, updateLogo);
