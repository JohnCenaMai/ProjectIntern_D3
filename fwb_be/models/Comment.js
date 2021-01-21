class Comment {
  constructor(connection) {
    this.connection = connection;
  }

  get(selectOpts, whereOpts, cb) {
    let sql = "SELECT * FROM comments";

    // Handle selection
    if (selectOpts.length > 0 && selectOpts) {
      let selection = "";

      selectOpts.map(
        (select, index) =>
          (selection += `${select} ${
            index == selectOpts.length - 1 ? "" : ","
          }`)
      );

      sql = sql.replace("*", selection);
    }
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

  deleteByPost(data, cb) {
    const sql = "DELETE FROM `comments` WHERE post_id = ? ";
    this.connection.query(sql, data, cb);
  }
}

export default Comment;
