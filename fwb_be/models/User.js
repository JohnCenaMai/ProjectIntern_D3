export default class User {
    constructor(connection) {
        this.connection = connection;
    }

    getOne(whereOpts, cb) {
        let sql = "SELECT * FROM users WHERE ";

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
            "UPDATE `users` SET `username`=?,`full_name`=?,`gender`=?,`age`=?,`link_fb`=?,`description`= ? WHERE id = ?";
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
}