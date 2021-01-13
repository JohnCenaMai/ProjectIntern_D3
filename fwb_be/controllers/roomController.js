import Room from "../models/Room.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const getRoomOne = (req, res) => {
    const room = new Room(connection);

    room.getOne(`id = ${req.params.id}`, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            status: "success",
            data: arrayToJson(result),
        });
    });
};

const createRoom = (req, res) => {
    const room = new Room(connection);

    const data = {
        name: req.body.name,
        created_at: Date.now()
    };

    room.createOne(data, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            status: "success",
            data: arrayToJson(result),
        });
    });
}

export { getRoomOne, createRoom };