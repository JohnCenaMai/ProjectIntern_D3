import Chat from "../models/Chat.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";
import constants from "../utlis/constants.js";

const createChat = (req, res) => {
    const data = {
        status: constants.DEFAULT_POST_STATUS,
        content: req.body.content,
        from: req.body.from,
        to: req.body.to
            //created_at: new Date().getTime()
    };
    //console.log(data);
    const chat = new Chat(connection);
    chat.createOne(data, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            status: "success",
            data: result
        });
    })
}

const getAllMessageFromRoom = (req, res) => {
    new Chat(connection).getAll(
        [
            "chats.content",
            "chats.status",
            "chats.created_at",
            "rooms.name"
        ], {
            table_name: ["rooms"],
            condition: ["chats.to = rooms.id"],
        },
        req.params.id === null ? "" : `Where rooms.id = ${req.params.id}`,
        (err, result) => {
            if (err) console.log(err);
            //console.log(result);
            res.status(200).json({
                status: "success",
                msg: "Query successfully!",
                data: result
            });
        }
    )
};

export { createChat, getAllMessageFromRoom };
