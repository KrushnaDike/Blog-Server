import Express from "express";
import { contact, getAllContacts } from "../controllers/otherController.js";

export default Express.Router()
  .post("/contact", contact)
  .get("/getAllContacts", getAllContacts);
