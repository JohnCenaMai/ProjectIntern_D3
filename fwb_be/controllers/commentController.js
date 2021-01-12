import Comment from "../models/Comment.js";
import connection from "./../server.js";

const getAllComments = (req, res) => {
  const comment = new Comment(connection);

  comment.get("", (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: `Query successfully!`,
      count: result.length,
      data: result,
    });
  });
};

const createComment = (req, res) => {
  const comment = new Comment(connection);

  const data = [req.body.content, null, req.body.post_id, req.user.id];

  comment.create(data, (err, result) => {
    if (err) console.log(err);

    res.status(201).json({
      status: "success",
      msg: `Commented created!`,
    });
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

export { createComment, replyComment, deleteComment, getAllComments };
