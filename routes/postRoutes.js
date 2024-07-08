import Express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postController.js";
import singleUpload from "../middlewares/multer.js";

export default Express.Router()
  .get("/getAllPosts", getAllPosts)
  .get("/getPostById/:postId", getPostById)
  .post("/createPost", singleUpload, createPost)
  .put("/updatePost/:postId", singleUpload, updatePost)
  .delete("/deletePost/:postId", deletePost);
