import express from "express";
import { isLoggedIn } from "../middlewares/isLogged.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard");
});

export default router;
