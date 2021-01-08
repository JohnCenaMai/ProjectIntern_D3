import express from "express";
import passport from "passport";
import { isLoggedIn } from "../middlewares/isLogged.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

export default router;
