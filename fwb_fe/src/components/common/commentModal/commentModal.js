import { Comment, Input, Modal, Popconfirm, Avatar, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./commentModal.css";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment, deleteComment } from "./../../../redux/actions/post";

function CommentModal({
  postId,
  isModalVisible,
  onCancle,
  onOK,
  addComment,
  deleteComment,
  comments,
  user,
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content !== "") {
      addComment(content, null, postId);
      setContent("");
    } else {
      message.warning("Please type something");
    }
  };

  const handleDelete = (id) => {
    deleteComment(id);
  };

  return (
    <>
      <Modal
        title="Comment"
        visible={isModalVisible}
        onCancel={onCancle}
        onOk={onOK}
      >
        <form className="cmtForm" onSubmit={handleSubmit}>
          <Input
            placeholder="Type something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
        {comments.map(
          (item) =>
            item.post_id === postId && (
              <Comment
                actions={[
                  <span key="comment-basic-reply-to">Reply to</span>,
                  <Popconfirm
                    key="comment-basic-like"
                    title="Are you sure?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span>
                      {item.userId === user.id && (
                        <span className="comment-action">Delete</span>
                      )}
                    </span>
                  </Popconfirm>,
                ]}
                author={<p>{item.username}</p>}
                content={<p>{item.content}</p>}
                avatar={
                  <Avatar
                    src={
                      item.imageUrl
                        ? `http://localhost:5000/images/${item.imageUrl}`
                        : ""
                    }
                    alt={item.username}
                  />
                }
                datetime={<span>{moment().format("YYYY-MM-DD HH:mm")}</span>}
              />
            )
        )}
      </Modal>
    </>
  );
}

CommentModal.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.posts.comments,
  user: state.auth.user,
});

export default connect(mapStateToProps, { addComment, deleteComment })(
  CommentModal
);
