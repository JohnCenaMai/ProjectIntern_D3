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
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { GgSignIn, LocalSignIn } from "./utlis/passport.js";
import AppError from "./utlis/appError.js";
import http from "http";
import * as ioSocket from "socket.io";

const app = express();

GgSignIn(passport);
// LocalSignIn(passport);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

const __dirname = dirname(fileURLToPath(
    import.meta.url));

app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

// Setup flash
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/chat", chatRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);

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