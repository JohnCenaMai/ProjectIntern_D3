import express from "express";
import { protectedRoute } from "../middlewares/isLogged.js";
import {
  getAllMatchingByUser,
  likePeople,
  acceptMatching,
  rejectMatching,
} from "../controllers/matchingController.js";
const router = express.Router();

router.get("/me", protectedRoute, getAllMatchingByUser);
router.post("/", protectedRoute, likePeople);
router.put("/:id", protectedRoute, acceptMatching);
router.put("/reject/:id", protectedRoute, rejectMatching);

export default router;
