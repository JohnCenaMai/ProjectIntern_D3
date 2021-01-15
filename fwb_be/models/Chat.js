export default class Chat {
    constructor(connection) {
        this.connection = connection;
    }

    createOne(data, cb) {
        console.log(data);
        this.connection.query("INSERT INTO chats SET ?", data, cb);
    }

    getAll(selectOpts, joinOpts, whereOpts, cb) {
        let sql = "SELECT * FROM chats ";
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
        if (Object.keys(joinOpts).length > 0) {
            joinOpts.table_name.map((name, index) => {
                sql += ` INNER JOIN ${name} ON ${joinOpts.condition[index]} `;
            });
        }
        if (whereOpts !== "") {
            sql += whereOpts;
        }
        //console.log(sql);
        this.connection.query(sql, cb);
    }

}
