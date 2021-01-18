import User from "../models/User.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const getUserProfile = (req, res) => {
  const user = new User(connection);

  user.getOne(`id = ${req.params.id}`, (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      data: arrayToJson(result),
    });
  });
};

const getMyProfile = (req, res) => {
  const user = new User(connection);

  user.getOne(`id = ${req.user.id}`, (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      data: arrayToJson(result),
    });
  });
};

const updateProfile = (req, res) => {
  const user = new User(connection);

  const data = [
    req.body.username,
    req.body.fullname,
    req.body.gender,
    req.body.age,
    req.body.link_fb,
    req.body.description,
    req.params.id,
  ];

  user.update(data, (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: "Updated!",
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
    });
  });
};

const uploadProfileImage = (req, res) => {
  const user = new User(connection);

  user.updateImage([req.file.path, req.params.id], (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: "Profile image updated!",
    });
  });
};

const getRandomUser = (req, res) => {
  console.log(req.user.id);
  const user = new User(connection);

  user.getRandomUser(
    ["email, username, full_name", "imageUrl"],
    [req.user.id],
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

export {
  getUserProfile,
  updateProfile,
  updateHobits,
  uploadProfileImage,
  getRandomUser,
  getMyProfile,
};
