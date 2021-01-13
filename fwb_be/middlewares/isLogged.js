import { promisify } from "util";
import jwt from "jsonwebtoken";

const isLoggedInPassport = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/");
    // return res.status(400).json({
    //   status: "fail",
    //   msg: "Unauthorzed!",
    // });
};

// When logged in => user can't go back to login page
// const forwardLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/dashboard");
// };

const protectedRoute = (req, res, next) => {
    // Get token from header
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" });
            } else {
                console.log();
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error("something wrong with auth middleware");
        res.status(500).json({ msg: "Server Error" });
    }
};

const isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

export { isLoggedIn, isLoggedInPassport, protectedRoute };