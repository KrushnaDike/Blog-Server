import Express from "express";
import { contact, getAllContacts } from "../controllers/otherController.js";
import {
  createYoutubeShort,
  deleteYoutubeShort,
  getAllYoutubeShorts,
  updateYoutubeShort,
} from "../controllers/ytShortsControlle.js";

export default Express.Router()
  .post("/contact", contact)
  .get("/getAllContacts", getAllContacts)

  .post("/createYoutubeShort", createYoutubeShort)
  .get("/getAllYoutubeShorts", getAllYoutubeShorts)
  .put("/updateYoutubeShort/:youtubeShortId", updateYoutubeShort)
  .delete("/deleteYoutubeShort/:youtubeShortId", deleteYoutubeShort);
