import connection from "../server.js";
import arrayToJson from "../utlis/arrayToJson.js";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import sendEmail from "./emailController.js";

const registerUser = async (req, res) => {
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
    status: 0,
  };

  const salt = await bcrypt.genSalt(10);

  userData.password = await bcrypt.hash(userData.password, salt);

  user.getOne(`email = "${req.body.email}"`, (err, result) => {
    if (err) console.log(err);

    if (result.length != 0) {
      console.log("Check user", req.body.email);

      return res.json({ status: "fail", msg: "This user has already created" });
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

            sendEmail(result[0].username, userData.email);

            res.status(201).json({ token });
          });
        });
      });
    }
  });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = new User(connection);

  user.getOne(`email = "${email}"`, async (err, result) => {
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

export { registerUser, loginUser };
