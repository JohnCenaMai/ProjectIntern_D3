const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    return next();
  }
  req.flash("error_msg", "Please log in to view that resource");
  res.redirect("/");
  // return res.status(400).json({
  //   status: "fail",
  //   msg: "Unauthorzed!",
  // });
};

export { isLoggedIn };
