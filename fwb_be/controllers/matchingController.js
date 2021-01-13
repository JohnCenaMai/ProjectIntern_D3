import Matching from "../models/Matching.js";
import constants from "../utlis/constants.js";
import connection from "./../server.js";

const getAllMatchingByUser = (req, res) => {
  const matching = new Matching(connection);

  matching.getAllMatchingByUser(
    [req.user.id],
    [
      "users.username",
      "users.email",
      "users.full_name",
      "users.imageUrl",
      "users.age",
      "matchings.status",
    ],
    (err, result) => {
      if (err) console.log(err);
      res.status(200).json({
        status: "success",
        count: result.length,
        data: result,
      });
    }
  );
};

const likePeople = (req, res) => {
  const matching = new Matching(connection);

  matching.createMatching(
    [req.user.id, req.body.like_for, constants.DEFAULT_MATCHING_STATUS],
    (err, result) => {
      if (err) console.log(err);

      res.status(201).json({
        status: "success",
        msg: "Matching sent!",
      });
    }
  );
};

const acceptMatching = (req, res) => {
  const matching = new Matching(connection);

  matching.acceptMatching([req.user.id, req.params.id], (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: "Matching acccepted!",
    });
  });
};

const rejectMatching = (req, res) => {
  const matching = new Matching(connection);

  matching.rejectMatching([req.user.id, req.params.id], (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: "Matching rejected!",
    });
  });
};

export { getAllMatchingByUser, likePeople, acceptMatching, rejectMatching };
