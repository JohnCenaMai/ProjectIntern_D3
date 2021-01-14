import express from "express";
import {
    getPost,
    createOnePost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/postController.js";
import { protectedRoute } from "../middlewares/isLogged.js";
import uploadImage from "../middlewares/uploadImage.js";

const router = express.Router();

// if req.params.id == null ? get all post : get 1 posts
router.get("/", getPost);
// This route has req.params.id
router.get("/:id", getPost);
router.post("/", protectedRoute, uploadImage, createOnePost);
router.put("/:id", updatePost);
router.put("/like/:id", protectedRoute, likePost);
router.delete("/:id", deletePost);

export default router;
