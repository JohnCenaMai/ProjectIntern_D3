export default class Chat {
    constructor(connection) {
        this.connection = connection;
    }

    createOne(data, cb) {
        this.connection.query("INSERT INTO chats SET ?", data, cb);
    }

    getAll(selectOpts, joinOpts, whereOpts, cb) {
        let sql = "SELECT * FROM chats WHERE ";

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
                sql += ` INNER JOIN ${name} ON ${joinOpts.condition[index]} `;
            });
        }

        // Handle Where
        if (whereOpts !== "") {
            sql += whereOpts;
        }

        this.connection.query(sql, cb);
    }

    removeIdMessage(data, cb) {
        let sql = "DELETE FROM chats WHERE id = ?";

        this.connection.query(sql, data, cb);
    }

}