export default class User {
  constructor(connection) {
    this.connection = connection;
  }

  getOne(selectOpts, joinOpts, whereOpts, cb) {
    let sql = "SELECT * FROM users";

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
        sql += ` INNER JOIN ${name} ON ${joinOpts.condition[index]} `;
      });
    }

    if (whereOpts) {
      sql += whereOpts;
    }

    this.connection.query(sql, cb);
  }

  createOne(data, cb) {
    this.connection.query("INSERT INTO users SET ?", data, cb);
  }

  update(data, cb) {
    const sql =
      "UPDATE `users` SET `username`=?,`full_name`=?,`gender`=?,`birthday`=?,`link_fb`=?,`description`= ?,`country`= ?,`region`= ? WHERE id = ?";
    this.connection.query(sql, data, cb);
  }

  updateHobits(data, cb) {
    const sql = "UPDATE `users` SET `hobits`=? WHERE id = ?";
    this.connection.query(sql, data, cb);
  }

  updateImage(data, cb) {
    const sql = "UPDATE `users` SET `imageUrl`= ? WHERE id = ?";
    this.connection.query(sql, data, cb);
  }

  generateResetToken(data, cb) {
    const sql =
      "UPDATE `users` SET `reset_token`= ?,`reset_token_expire`=? WHERE id = ?";

    this.connection.query(sql, data, cb);
  }

  updatePassword(data, cb) {
    const sql =
      "UPDATE `users` SET `password` = ? ,`reset_token`= null,`reset_token_expire`= null WHERE id = ?";

    this.connection.query(sql, data, cb);
  }

  getRandomUser(selectOpts, data, cb) {
    let sql = `SELECT * FROM users
    LEFT JOIN matchings ON users.id = matchings.matching_name_one
    WHERE users.id NOT IN (SELECT id FROM users WHERE users.id = ?)
    AND users.id NOT IN (SELECT matching_name_two FROM matchings WHERE matchings.matching_name_one = ?)
    ORDER BY RAND()
    LIMIT 10`;

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

    this.connection.query(sql, data, cb);
  }

  createUserRole(data, cb) {
    const sql = "INSERT INTO `user_role` (`user_id`, `role_id`) VALUES (?,?);";
    this.connection.query(sql, data, cb);
  }

  updateUserRole(data, cb) {
    const sql =
      "UPDATE `user_role` SET `role_id`= ? WHERE `user_id`= ? AND `role_id`= ?";
    this.connection.query(sql, data, cb);
  }
}
