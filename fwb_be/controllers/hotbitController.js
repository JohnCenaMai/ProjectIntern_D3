import connection from "./../server.js";
import Hobit from "./../models/Hobits.js";
import AppError from "../utlis/appError.js";

const getAllHobits = (req, res, next) => {
  const hobit = new Hobit(connection);

  hobit.getAllHobits((err, result) => {
    if (err) {
      next(new AppError(500, err.sqlMessage));
    } else {
      let hobits = [];
      result.map((item) => hobits.push(item.name));

      res.status(200).json({
        status: "success",
        msg: "Query successfully!",
        count: result.length,
        data: hobits,
      });
    }
  });
};

export { getAllHobits };
