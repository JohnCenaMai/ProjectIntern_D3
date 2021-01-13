class Hobit {
  constructor(connection) {
    this.connection = connection;
  }

  getAllHobits(cb) {
    const sql = "SELECT * FROM hobits";
    this.connection.query(sql, cb);
  }
}
