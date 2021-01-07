import passport from "passport";

const ggSignIn = (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

const ggSignInCallback = (req, res) => {
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  });
};

export { ggSignIn, ggSignInCallback };
