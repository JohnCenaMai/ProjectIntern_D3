import connection from "../server.js";
import arrayToJson from "../utlis/arrayToJson.js";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";
import validationResult_ from "express-validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "./emailController.js";
import constants from "../utlis/constants.js";

const { validationResult } = validationResult_;

const registerUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = new User(connection);

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        status: constants.DEFAULT_USER_STATUS,
    };

    const salt = await bcrypt.genSalt(10);

    userData.password = await bcrypt.hash(userData.password, salt);

    user.getOne(`email = "${req.body.email}"`, (err, result) => {
        if (err) console.log(err);

        if (result.length != 0) {
            console.log("Check user", req.body.email);

            return res.json({
                status: "fail",
                msg: "This user has already created",
            });
        } else {
            user.createOne(userData, (err, result) => {
                return user.getOne(`email = "${userData.email}"`, (err, result) => {
                    const payload = {
                        user: {
                            id: result[0].id,
                        },
                    };

                    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                        if (err) throw err;

                        res.cookie("jwt", token, {
                            expires: new Date(
                                Date.now() + process.env.JWT_EXPIRED_IN * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true,
                        });

                        sendEmail(
                            userData.email,
                            `<p>Hello ${userData.username}, welcome to Friend with benefit<p>`
                        );

                        res.status(201).json({ token });
                    });
                });
            });
        }
    });
};

const loginUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = new User(connection);

    user.getOne(`email = "${email}"`, async(err, result) => {
        if (err) console.log(err);

        if (result.length == 0) {
            return res.json({ status: "fail", msg: "Invalid User. Please Login" });
        } else {
            const isMatch = await bcrypt.compare(password, result[0].password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }

            const payload = {
                user: {
                    id: result[0].id,
                },
            };

            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if (err) throw err;

                res.cookie("jwt", token, {
                    expires: new Date(
                        Date.now() + process.env.JWT_EXPIRED_IN * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true,
                });

                res.status(200).json({ token });
            });
        }
    });
};

const forgotPassword = async(req, res) => {
    // Find user with email
    const user = new User(connection);

    user.getOne(`email = "${req.body.email}"`, (err, result) => {
        if (err) console.log(err);

        // Generate random token
        let resetToken = crypto.randomBytes(32).toString("hex");

        resetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const data = [resetToken, Date.now() + 10 * 60 * 1000, result[0].id];
        console.log("Data", data);

        user.generateResetToken(data, (err, result) => {
            if (err) console.log(err);
        });

        // Send token to user by email
        sendEmail(result[0].email, `Your reset code: ${resetToken}`);

        res.json({
            status: "success",
            msg: "Reset code has been sent",
        });
    });
};

const resetPassword = async(req, res) => {
    // Find user with reset token
    const user = new User(connection);

    user.getOne(`reset_token = "${req.params.token}"`, async(err, result) => {
        console.log(result);

        if (result.length == 0) {
            return res.status(404).json({
                status: "fail",
                msg: "Can't found this user",
            });
        } else {
            if (result[0].reset_token_expire < Date.now()) {
                return res.status(400).json({
                    status: "fail",
                    msg: "Invalid reset token",
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const encriptPassword = await bcrypt.hash(req.body.password, salt);

                const data = [encriptPassword, result[0].id];
                user.updatePassword(data, (err, result) => {
                    if (err) console.log(err);

                    return res.status(201).json({
                        status: "success",
                        msg: "Password changed!",
                    });
                });
            }
        }
    });
    // Check if token expired
    // Change Password
    // Send token to user by email
};

export { registerUser, loginUser, forgotPassword, resetPassword };
