import express from "express";
import {
  getRandomUser,
  getUserProfile,
  updateHobits,
  updateProfile,
  uploadProfileImage,
  getMyProfile,
  searchPeople,
} from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/isLogged.js";
import uploadImage from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/random", protectedRoute, getRandomUser);
router.get("/me", protectedRoute, getMyProfile);
router.get("/profile/search", protectedRoute, searchPeople);
router.get("/:id", getUserProfile);
router.put("/:id", protectedRoute, updateProfile);

// Input: Array of strings
router.patch("/hobits/:id", protectedRoute, updateHobits);

router.patch("/image/:id", protectedRoute, uploadImage, uploadProfileImage);

export default router;
