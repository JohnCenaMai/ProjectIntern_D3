class Comment {
  constructor(connection) {
    this.connection = connection;
  }

  get(whereOpts, cb) {
    let sql = "SELECT * FROM comments";

    // Handle Where
    if (whereOpts != "") {
      sql += whereOpts;
    }

    this.connection.query(sql, cb);
  }

  create(data, cb) {
    const sql =
      "INSERT INTO `comments`(`content`,`parent_id`, `post_id`, `user_id`) VALUES (?,?,?,?)";
    this.connection.query(sql, data, cb);
  }

  delete(data, cb) {
    const sql = "DELETE FROM `comments` WHERE id = ? OR parent_id = ?";
    this.connection.query(sql, data, cb);
  }
}

export default Comment;
