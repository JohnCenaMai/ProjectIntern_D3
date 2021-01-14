import dotenv from "dotenv";
import mysql from "mysql";
import app from "./app.js";

import http from "http";
import * as ioSocket from "socket.io";

// Config the config file
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
});

// Check whether conecting to db was success or not
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB connected!");
    }
});

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

/*const io = new ioSocket.Server(server);
const freetuts = io.of("/freetuts");
//Chi định namespace có tên /freetuts
freetuts.on("connection", function(socket) {
    console.log("Một người vừa kết nối.");
    //Nhận yêu cầu vào phòng từ clients
    socket.on("join room", function(data) {
        //THam gia phòng
        socket.join("freetutsRoom");
        //Trả lại thông báo cho người vào phòng
        socket.emit("notification", "Bạn đã tham gia vào phòng");

        //Trả lại thông báo cho tất cả người còn lại trong phòng
        freetuts.to("freetutsRoom").emit("notification", "Một người đã vào phòng.");
    });

    //Nhận yêu cầu rời phòng từ clients
    socket.on("leave room", function(data) {
        //Rời phòng
        socket.leave("freetutsRoom");
        //Trả lại thông báo cho người vào phòng
        socket.emit("notification", "Bạn đã rời phòng");
        //Trả lại thông báo cho tất cả người trong phòng
        freetuts.to("freetutsRoom").emit("notification", "Một người đã rời phòng.");
    });
});*/

const io = new ioSocket.Server(server);
var users = [];
io.on("connection", (socket) => {
    //console.log("User connected", socket.id);
    // attach incoming listener for new user
    socket.on("user_connected", (username) => {
        // save in array
        users[username] = socket.id;

        // socket ID will be used to send message to individual person

        // notify all connected clients
        socket.emit("user_connected", username);
    });

    // listen from client inside IO "connection" event
    socket.on("send_message", (data) => {
        // send event to receiver
        const socketId = users[data.receiver];
        console.log(socketId);
        io.to(socketId).emit("new_message", data);
    });

});

export default connection;
