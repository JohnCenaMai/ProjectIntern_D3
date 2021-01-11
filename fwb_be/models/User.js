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
}
