import express from "express";
import { protectedRoute } from "../middlewares/isLogged.js";
import {
  test,
  generateClientSecret,
  createPayment,
} from "../controllers/paymentController.js";
const router = express.Router();

router.get("/", protectedRoute, test);
router.post("/", protectedRoute, createPayment);
router.post("/create", protectedRoute, generateClientSecret);

export default router;
