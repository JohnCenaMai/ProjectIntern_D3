import express from "express";
import { isLoggedIn } from "../middlewares/isLogged.js";

const router = express.Router();

router.get("/room", (req, res) => {
    //console.log('hello world');
    res.render("room_chat");
});

export default router;