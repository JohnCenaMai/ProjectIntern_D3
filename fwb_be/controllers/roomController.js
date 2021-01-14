import Room from "../models/Room.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const getRoom = (req, res) => {
    const room = new Room(connection);
    room.getOne(req.params.id, (err, result) => {
        if (err) console.log(err);
        res.status(200).json({
            status: "success",
            data: arrayToJson(result),
        });
    })
}

const createRoom = (req, res) => {
    const room = new Room(connection);

    const data = {
        name: req.body.name
    };

    room.createOne(data, (err, result) => {
        if (err) console.log(err);
        res.status(200).json({
            status: "success",
            data: result,
        });
    });
}

export { getRoom, createRoom };
