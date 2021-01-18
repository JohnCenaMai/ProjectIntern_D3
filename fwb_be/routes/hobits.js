import express from "express";
import { getAllHobits } from "../controllers/hotbitController.js";

const router = express.Router();

router.get("/", getAllHobits);

export default router;
