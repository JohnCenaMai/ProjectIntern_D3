import User from "../models/User.js";
import AppError from "../utlis/appError.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const getUserProfile = (req, res) => {
  const user = new User(connection);

  user.getOne([], {}, `id = ${req.params.id}`, (err, result) => {
    if (err) console.log(err);

    result[0].hobits = result[0].hobits.split(",");

    res.status(200).json({
      status: "success",
      data: arrayToJson(result),
    });
  });
};

const getMyProfile = (req, res, next) => {
  const user = new User(connection);

  user.getOne(
    [
      "users.id",
      "users.username",
      "users.full_name",
      "users.email",
      "users.birthday",
      "users.country",
      "users.region",
      "users.description",
      "users.gender",
      "users.imageUrl",
      "users.hobits",
      "roles.name AS role",
    ],
    {
      table_name: ["user_role", "roles"],
      condition: [
        "users.id = user_role.user_id",
        "user_role.role_id = roles.id",
      ],
    },
    ` WHERE users.id = ${req.user.id}`,
    (err, result) => {
      if (err) next(new AppError(err.sqlMessage, 500));

      result[0].hobits = result[0].hobits.split(",");

      res.status(200).json({
        status: "success",
        data: arrayToJson(result),
      });
    }
  );
};

const updateProfile = (req, res, next) => {
  const user = new User(connection);

  const data = [
    req.body.username,
    req.body.fullname,
    req.body.gender,
    req.body.birthday,
    req.body.link_fb,
    req.body.description,
    req.body.country,
    req.body.region,
    req.params.id,
  ];

  user.update(data, (err, result) => {
    if (err) {
      next(new AppError(err.sqlMessage, 500));
    }

    user.getOne([], {}, `id = ${req.params.id}`, (err, getResult) => {
      if (err) {
        next(new AppError(err.sqlMessage, 500));
      } else {
        getResult[0].hobits = getResult[0].hobits.split(",");

        res.status(200).json({
          status: "success",
          msg: "Updated!",
          data: arrayToJson(getResult),
        });
      }
    });
  });
};

const updateHobits = (req, res) => {
  const user = new User(connection);

  let hobits = "";

  req.body.hobits.map((hobit) => {
    hobits += `,${hobit}`;
  });

  hobits = hobits.slice(1, hobits.length);

  user.updateHobits([hobits, req.params.id], (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: "Hobits updated!",
      data: hobits.split(","),
    });
  });
};

const uploadProfileImage = (req, res) => {
  const user = new User(connection);

  user.updateImage([req.file.filename, req.params.id], (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: "Profile image updated!",
      data: req.file.filename,
    });
  });
};

const getRandomUser = (req, res, next) => {
  console.log(req.user.id);
  const user = new User(connection);

  user.getRandomUser(
    ["id", "email, username, full_name", "imageUrl", "region", "country"],
    [req.user.id],
    (err, result) => {
      if (err) {
        next(new AppError(err.sqlMessage, 500));
      }

      res.status(200).json({
        status: "success",
        count: result.length,
        data: result,
      });
    }
  );
};

export {
  getUserProfile,
  updateProfile,
  updateHobits,
  uploadProfileImage,
  getRandomUser,
  getMyProfile,
};
