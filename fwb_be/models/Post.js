class Post {
  constructor(connection) {
    this.connection = connection;
  }

  // selectOpts: [], joinOpts: {table_name: [], condition: []}

  get(selectOpts, joinOpts, whereOpts, cb) {
    let sql = "SELECT * FROM posts";

    // Handle selection
    if (selectOpts.length > 0) {
      let selection = "";

      selectOpts.map(
        (select, index) =>
          (selection += `${select} ${
            index == selectOpts.length - 1 ? "" : ","
          }`)
      );

      sql = sql.replace("*", selection);
    }

    // Handle join
    if (Object.keys(joinOpts).length > 0) {
      joinOpts.table_name.map((name, index) => {
        sql += ` LEFT JOIN ${name} ON ${joinOpts.condition[index]} `;
      });
    }

    // Handle Where
    if (whereOpts !== "") {
      sql += whereOpts;
    }

    console.log(sql);

    this.connection.query(sql, cb);
  }

  createOne(data, cb) {
    this.connection.query("INSERT INTO posts SET ?", data, cb);
  }

  // Data is an array
  updateOne(data, cb) {
    this.connection.query(
      "UPDATE posts SET title = ?, content = ?, status = ? WHERE id = ?",
      data,
      cb
    );
  }

  deleteOne(data, cb) {
    this.connection.query("DELETE FROM posts WHERE id = ?", data, cb);
  }

  like(data, cb) {
    this.connection.query(
      "UPDATE `posts` SET `like`= ? WHERE id = ?",
      data,
      cb
    );
  }
}

export default Post;
