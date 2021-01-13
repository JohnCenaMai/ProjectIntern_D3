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
}

export default Matching;
