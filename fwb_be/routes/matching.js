import express from "express";
import { protectedRoute } from "../middlewares/isLogged.js";
import { getAllMatchingByUser } from "../controllers/matchingController.js";
const router = express.Router();

router.get("/me", protectedRoute, getAllMatchingByUser);

export default router;
