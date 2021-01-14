export default class Room {
    constructor(connection) {
        this.connection = connection;
    }

    createOne(data, cb) {
        let sql = `INSERT INTO rooms (name) values ("${data.name}")`;
        //console.log(sql);
        this.connection.query(sql, cb);
    }

    getOne(idroom, cb) {
        let sql = `SELECT * FROM rooms WHERE id = '${idroom}'`;

        this.connection.query(sql, cb);
    }

}
