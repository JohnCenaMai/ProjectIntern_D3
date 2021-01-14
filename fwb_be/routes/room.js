import express from "express";
import { getRoom, createRoom } from "../controllers/roomController.js";

const router = express.Router();

router.get("/:id", getRoom);

router.post("/", createRoom);

export default router;
