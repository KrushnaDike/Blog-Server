import Express from "express";
import {
  createQuickLink,
  deleteQuickLink,
  getAllQuickLinks,
  updateQuickLink,
} from "../controllers/quicklinksController.js";

export default Express.Router()
  .post("/createQuickLink", createQuickLink)
  .get("/getAllQuickLinks", getAllQuickLinks)
  .put("/updateQuickLink/:quickLinkId", updateQuickLink)
  .delete("/deleteQuickLink/:quickLinkId", deleteQuickLink);
