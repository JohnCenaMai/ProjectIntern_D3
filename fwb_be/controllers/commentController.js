import Comment from "../models/Comment.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const getAllComments = (req, res) => {
  const comment = new Comment(connection);

  comment.get(
    [
      "comments.id",
      "comments.content",
      "comments.post_id",
      "comments.created_at",
      "users.id AS userId",
      "users.username",
      "users.imageUrl",
    ],
    " INNER JOIN users ON users.id = comments.user_id ORDER BY comments.created_at DESC",
    (err, result) => {
      if (err) console.log(err);

      res.status(201).json({
        status: "success",
        msg: `Query successfully!`,
        count: result.length,
        data: result,
      });
    }
  );
};

const getCommentsByPost = (req, res) => {
  const comment = new Comment(connection);

  comment.get(
    [],
    ` INNER JOIN users ON users.id = comments.user_id WHERE post_id = ${req.params.id}`,
    (err, result) => {
      if (err) console.log(err);

      res.status(201).json({
        status: "success",
        msg: `Query successfully!`,
        count: result.length,
        data: result,
      });
    }
  );
};

const createComment = (req, res) => {
  const comment = new Comment(connection);

  const data = [req.body.content, null, req.body.postId, req.user.id];

  comment.create(data, (err, result) => {
    if (err) console.log(err);
    console.log(result);

    comment.get(
      [
        "comments.id",
        "comments.content",
        "comments.post_id",
        "comments.created_at",
        "users.id AS userId",
        "users.username",
        "users.imageUrl",
      ],
      ` INNER JOIN users ON users.id = comments.user_id WHERE comments.id = ${result.insertId}`,
      (err, getRes) => {
        res.status(201).json({
          status: "success",
          msg: `Commented created!`,
          data: arrayToJson(getRes),
        });
      }
    );
  });
};

const replyComment = (req, res) => {
  const comment = new Comment(connection);

  const data = [req.body.content, req.params.id, req.body.post_id, req.user.id];

  comment.create(data, (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: `Comment replied`,
    });
  });
};

const deleteComment = (req, res) => {
  const comment = new Comment(connection);

  const data = [req.params.id, req.params.id];

  comment.delete(data, (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: `Comment deleted`,
    });
  });
};

export {
  createComment,
  replyComment,
  deleteComment,
  getAllComments,
  getCommentsByPost,
};
