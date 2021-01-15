import express from "express";
import { createChat, getAllMessageFromRoom } from "../controllers/chatController.js";

const router = express.Router();

router.get("/room/:id", getAllMessageFromRoom);

router.post("/", createChat);

export default router;
