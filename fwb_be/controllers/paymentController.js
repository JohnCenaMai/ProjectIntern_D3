import Stripe from "stripe";
import connection from "./../server.js";
import Payment from "./../models/Payment.js";
import User from "./../models/User.js";
import AppError from "../utlis/appError.js";
import constants from "../utlis/constants.js";

const stripe = Stripe(
  "sk_test_51IAuM3BX9LsAfc8lIKPnC28Ru1JDnziJHLX3hl9kYjYmy0yq8IH1ILP9YKnx7a43m13CWFPc1i7JRmb5TitkCqoU00hcW17eeW"
);

const test = (req, res) => {
  res.send("DEMO PAYMENT");
};

const createPayment = (req, res, next) => {
  const data = [req.user.id, req.body.method, req.body.amount];

  const payment = new Payment(connection);
  const user = new User(connection);
  payment.create(data, (err, result) => {
    if (err) {
      next(new AppError(err.sqlMessge, 500));
    } else {
      const updateUserRoleData = [
        constants.USER_PREMIUM,
        req.user.id,
        constants.DEFAULT_USER_ROLE,
      ];
      user.updateUserRole(updateUserRoleData, (err, updateRes) => {
        if (err) {
          next(new AppError(err.sqlMessge, 500));
        } else {
          res.status(201).json({
            status: "success",
            msg: "Paid!",
            data: {
              role: "premium",
            },
          });
        }
      });
    }
  });
};

const generateClientSecret = async (req, res) => {
  const total = req.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export { test, generateClientSecret, createPayment };
