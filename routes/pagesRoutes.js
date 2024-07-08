import Express from "express";
import {
  deletePage,
  getAllPages,
  savePage,
  updatePage,
} from "../controllers/pagesController.js";

export default Express.Router()
  .post("/savePage", savePage)
  .get("/getAllPages", getAllPages)
  .put("/updatePage/:pageId", updatePage)
  .delete("/deletePage/:pageId", deletePage);
