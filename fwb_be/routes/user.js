import express from "express";
import {
  getRandomUser,
  getUserProfile,
  updateHobits,
  updateProfile,
  uploadProfileImage,
  getMyProfile,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/isLogged.js";
import uploadImage from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/random", protectedRoute, getRandomUser);
router.get("/:id", getUserProfile);
router.patch("/:id", protectedRoute, updateProfile);

// Input: Array of strings
router.patch("/hobits/:id", protectedRoute, updateHobits);

router.patch("/image/:id", protectedRoute, uploadImage, uploadProfileImage);

export default router;
