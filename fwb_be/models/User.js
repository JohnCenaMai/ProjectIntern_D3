export default class User {
  constructor(connection) {
    this.connection = connection;
  }

  getOne(whereOpts, cb) {
    let sql = "SELECT * FROM users WHERE ";

    if (whereOpts) {
      sql += whereOpts;
    }

    console.log(sql);

    this.connection.query(sql, cb);
  }

  createOne(data, cb) {
    this.connection.query("INSERT INTO users SET ?", data, cb);
  }

  generateResetToken(data, cb) {
    let sql =
      "UPDATE `users` SET `reset_token`= ?,`reset_token_expire`=? WHERE id = ?";

    this.connection.query(sql, data, cb);
  }

  updatePassword(data, cb) {
    let sql =
      "UPDATE `users` SET `password` = ? ,`reset_token`= null,`reset_token_expire`= null WHERE id = ?";

    this.connection.query(sql, data, cb);
  }
}
