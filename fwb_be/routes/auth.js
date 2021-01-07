import express from "express";
import { ggSignIn, ggSignInCallback } from "../controllers/authController";

const router = express.Router();

router.get("/auth/google", ggSignIn);
router.get("/auth/google/callback", ggSignInCallback);

export default router;
