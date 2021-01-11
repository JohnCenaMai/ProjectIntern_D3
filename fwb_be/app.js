import express from "express";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import postRoute from "./routes/posts.js";
import indexRoute from "./routes/index.js";
import authRoute from "./routes/auth.js";
import { GgSignIn, LocalSignIn } from "./utlis/passport.js";

const app = express();

GgSignIn(passport);
// LocalSignIn(passport);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.use("/auth", authRoute);
app.use("/api/posts", postRoute);

export default app;
