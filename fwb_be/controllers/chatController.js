import Chat from "../models/Chat.js";
import arrayToJson from "../utlis/arrayToJson.js";
import connection from "./../server.js";

const createMessage = (req, res) => {
    const data = {
        status: constants.DEFAULT_POST_STATUS,
        content: req.body.content,
        from: req.body.from,
        to: req.body.to,
        created_at: Date.now()
    };

    const chatMessage = new Chat(connection);
    chatMessage.createOne(data, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            status: "success",
            data: arrayToJson(result),
        });
    })
}

const getAllMessageFromRoom = (req, res) => {
    new Chat(connection).getAll(
        [
            "posts.id",
            "posts.title",
            "posts.content",
            "posts.like",
            "users.username",
            "images.imageUrl",
        ], {
            table_name: ["rooms"],
            condition: ["users.id = posts.user_id"],
        },
        req.params.id === null ? "" : `Where posts.id = ${req.params.id}`,
        (err, result) => {
            if (err) console.log(err);

            if (result.like != null) {
                result.like = result.like.split(",");
            }

            result.map((item) => {
                if (item.like != null) {
                    item.like = item.like.trim().split(",");
                }
            });

            res.status(200).json({
                status: "success",
                msg: "Query successfully!",
                count: result.length,
                data: result,
            });
        }
    )
};

const removeChatSender_To = (req, res) => {
    const remove_chat_sender_to = new Chat(connection);

    remove_chat_sender_to.removeIdMessage(`id = ${req.params.id}`, (err, result) => {
        if (err) console.log(err);

        res.status(200).json({
            status: "success",
            data: arrayToJson(result),
        });
    });
};

export { createMessage, getAllMessageFromRoom, removeChatSender_To };