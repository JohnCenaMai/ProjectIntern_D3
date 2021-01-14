import Matching from "../models/Matching.js";
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
        data: result,
      });
    }
  );
};

export { getAllMatchingByUser };
