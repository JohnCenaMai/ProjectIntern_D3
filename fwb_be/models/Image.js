class Image {
  constructor(connection) {
    this.connection = connection;
  }

  get(whereOpts, cb) {
    let sql = "SELECT * FROM images";

    // Handle Where
    if (whereOpts != "") {
      sql += whereOpts;
    }

    this.connection.query(sql, cb);
  }

  upload(data, cb) {
    const sql = "INSERT INTO `images`(`imageUrl`, `post_id`) VALUES (?,?)";
    this.connection.query(sql, data, cb);
  }

  delete(data, cb) {
    const sql = "DELETE FROM `images` WHERE post_id = ?";
    this.connection.query(sql, data, cb);
  }
}

export default Image;
