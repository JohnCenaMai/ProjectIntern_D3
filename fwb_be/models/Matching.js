class Matching {
  constructor(connection) {
    this.connection = connection;
  }

  getAllMatchingByUser(data, selectOpts, cb) {
    let sql = `SELECT * FROM matchings
    INNER JOIN users ON users.id = matchings.matching_name_two
    WHERE matching_name_one = ? ORDER BY status`;

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

  createMatching(data, cb) {
    const sql =
      "INSERT INTO `matchings`(`matching_name_one`, `matching_name_two`, `status`) VALUES (?,?,?)";
    this.connection.query(sql, data, cb);
  }

  acceptMatching(data, cb) {
    const sql =
      "UPDATE `matchings` SET `status`=1 WHERE `matching_name_one`=? AND `matching_name_two`=?";
    this.connection.query(sql, data, cb);
  }

  rejectMatching(data, cb) {
    const sql =
      "UPDATE `matchings` SET `status`=2 WHERE `matching_name_one`=? AND `matching_name_two`=?";
    this.connection.query(sql, data, cb);
  }
}

export default Matching;
