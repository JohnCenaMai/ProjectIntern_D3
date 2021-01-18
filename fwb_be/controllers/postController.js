import Comment from "../models/Comment.js";
import Image from "../models/Image.js";
import User from "../models/User.js";
import arrayToJson from "../utlis/arrayToJson.js";
import constants from "../utlis/constants.js";
import Post from "./../models/Post.js";
import connection from "./../server.js";

const getPost = (req, res) => {
  // getAll has 3 parameters:
  // selectOpts: [],
  // joinOpts: {},
  // whereOpts: {},
  // callback

  new Post(connection).get(
    [
      "posts.id",
      "posts.title",
      "posts.content",
      "posts.like",
      "posts.created_at",
      "users.username",
      "users.imageUrl AS userImageUrl",
      "images.imageUrl",
    ],
    {
      table_name: ["users", "images"],
      condition: ["users.id = posts.user_id", "posts.id = images.post_id"],
    },
    req.params.id == null ? "" : `Where posts.id = ${req.params.id}`,
    (err, result) => {
      if (err) console.log(err);

      if (result.like != null) {
        result.like = result.like.split(",");
      }

      result.map((item) => {
        if (item.like != null) {
          item.like = item.like.trim().split(",");
        } else {
          item.like = [];
        }
      });

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
    status: constants.DEFAULT_POST_STATUS,
    user_id: req.user.id,
  };

  const post = new Post(connection);
  const image = new Image(connection);

  post.createOne(data, (err, result) => {
    if (err) console.log(err);

    const lastInsertId = result.insertId;

    image.upload([req.file.filename, lastInsertId], (err, uploadRes) => {
      if (err) console.log(err);

      post.get(
        [
          "posts.id",
          "posts.title",
          "posts.content",
          "posts.like",
          "posts.created_at",
          "users.username",
          "users.imageUrl AS userImageUrl",
          "images.imageUrl",
        ],
        {
          table_name: ["users", "images"],
          condition: ["users.id = posts.user_id", "posts.id = images.post_id"],
        },
        `Where posts.id = ${lastInsertId}`,
        (err, createRes) => {
          if (err) console.log(err);

          if (createRes.like != null) {
            createRes.like = createRes.like.split(",");
          }

          createRes.map((item) => {
            if (item.like != null) {
              item.like = item.like.trim().split(",");
            } else {
              item.like = [];
            }
          });

          res.status(200).json({
            status: "success",
            msg: "Create successfully!",
            data: arrayToJson(createRes),
          });
        }
      );
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
  const post = new Post(connection);
  const comment = new Comment(connection);
  const image = new Image(connection);

  image.delete(req.params.id, (err, result) => {
    if (err) console.log(err);

    post.deleteOne(req.params.id, (err, result) => {
      if (err) console.log(err);

      comment.deleteByPost(req.params.id, (err, commentResult) => {
        if (err) console.log(err);

        res.status(200).json({
          status: "success",
          msg: `Item id ${req.params.id} deleted!`,
        });
      });
    });
  });
};

const likePost = (req, res) => {
  const post = new Post(connection);

  post.get([], {}, ` where posts.id = ${req.params.id}`, (err, result) => {
    let likes = result[0].like;

    // Check user liked or not
    new User(connection).getOne(`id = "${req.user.id}"`, (err, result) => {
      let email = result[0].email;
      if (likes !== null && likes.includes(email)) {
        res.json({
          status: "fail",
          msg: "You've already liked this post!",
        });
      } else {
        likes += `,${email}`;

        post.like([likes, req.params.id], (err, data) => {
          res.status(200).json({
            status: "success",
            msg: "Post liked!",
          });
        });
      }
    });
  });
};

export { getPost, createOnePost, updatePost, deletePost, likePost };
