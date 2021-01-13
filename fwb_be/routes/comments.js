import express from "express";
import {
    createComment,
    deleteComment,
    replyComment,
    getAllComments,
} from "../controllers/commentController.js";
import { protectedRoute } from "../middlewares/isLogged.js";

const router = express.Router();

router.get("/", protectedRoute, getAllComments);
router.post("/", protectedRoute, createComment);
router.post("/:id", protectedRoute, replyComment);
router.delete("/:id", protectedRoute, deleteComment);

export default router;