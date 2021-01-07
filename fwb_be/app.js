import express from "express";
import morgan from "morgan";
import postRoute from "./routes/posts.js";
import GgSignIn from "./utlis/passport";
import passport from "passport";
import session from "express-session";

const app = express();

GgSignIn(passport);

app.use(express.json());
app.use(morgan("tiny"));

// Setup session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/posts", postRoute);

export default app;
