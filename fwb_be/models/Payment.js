class Payment {
  constructor(connection) {
    this.connection = connection;
  }

  get(whereOpts, cb) {
    let sql = "SELECT * FROM payments";

    // Handle Where
    if (whereOpts != "") {
      sql += whereOpts;
    }

    this.connection.query(sql, cb);
  }

  create(data, cb) {
    const sql =
      "INSERT INTO `payments`(`userId`, `method`, `amount`) VALUES (?,?,?)";

    this.connection.query(sql, data, cb);
  }
}

export default Payment;
