import express from "express";
import passport from "passport";
import { loginUser, registerUser } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/isLogged.js";
import { check } from "express-validator";

const router = express.Router();

// GG Sign In
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
// End GG Sign In

router.post(
  "/register",
  check("username", "Username is required").notEmpty(),
  check("email", "Please provide valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  registerUser
);

router.post(
  "/login",
  check("email", "Please provide valid email").isEmail(),
  check("password", "Password is required").exists(),
  loginUser
);

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

export default router;
