export default class Room {
    constructor(connection) {
        this.connection = connection;
    }

    getOne(whereOpts, cb) {
        let sql = "SELECT * FROM rooms WHERE ";

        if (whereOpts) {
            sql += whereOpts;
        }

        this.connection.query(sql, cb);
    }

    createOne(data, cb) {
        this.connection.query("INSERT INTO rooms SET ?", data, cb);
    }

}