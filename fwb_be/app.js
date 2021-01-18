import express from "express";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import cors from "cors";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import indexRoute from "./routes/index.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import matchingRoute from "./routes/matching.js";
import hobitRoute from "./routes/hobits.js";
import { GgSignIn, LocalSignIn } from "./utlis/passport.js";
import AppError from "./utlis/appError.js";

const app = express();

GgSignIn(passport);
// LocalSignIn(passport);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

// Setup flash
app.use(flash());

// let store = new session.MemoryStore();

// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//     store: store,
//   })
// );

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);
app.use("/api/matching", matchingRoute);
app.use("/api/hobits", hobitRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

// Error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
});

export default app;
