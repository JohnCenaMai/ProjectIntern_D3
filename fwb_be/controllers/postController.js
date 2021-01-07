import Post from "./../models/Post.js";
import connection from "./../server.js";

const getPost = (req, res) => {
  // getAll has 3 parameters:
  // selectOpts: [],
  // joinOpts: {},
  // whereOpts: {},
  // callback

  new Post(connection).get(
    ["posts.id", "posts.title", "posts.content", "users.username"],
    {
      table_name: ["users"],
      condition: ["users.id = posts.user_id"],
    },
    req.params.id == null ? "" : "Where posts.id = 2",
    (err, result) => {
      if (err) console.log(err);

      res.status(200).json({
        status: "success",
        msg: "Query successfully!",
        count: result.length,
        data: result,
      });
    }
  );
};

const createOnePost = (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content,
    status: 0,
    user_id: 1,
  };

  new Post(connection).createOne(data, (err, result) => {
    if (err) console.log(err);

    console.log("Last insert ID:", result.insertId);

    res.status(200).json({
      status: "success",
      msg: `Item id ${result.insertId} created!`,
    });
  });
};

const updatePost = (req, res) => {
  const data = [
    req.body.title,
    req.body.content,
    req.body.status,
    req.params.id,
  ];

  new Post(connection).updateOne(data, (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: `Item id ${result.insertId} updated!`,
    });
  });
};

const deletePost = (req, res) => {
  new Post(connection).deleteOne(req.params.id, (err, result) => {
    if (err) console.log(err);

    res.status(200).json({
      status: "success",
      msg: `Item id ${result.insertId} deleted!`,
    });
  });
};

export { getPost, createOnePost, updatePost, deletePost };
