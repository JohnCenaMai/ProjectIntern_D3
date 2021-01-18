import React, { Fragment } from "react";
import "./feedItem.css";
import { Avatar, Image, Typography } from "antd";
import { Menu, Dropdown, Row, Col } from "antd";
import {
  MoreOutlined,
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
} from "@ant-design/icons";
import ReactTimeAgo from "react-time-ago";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likePost, deletePost } from "./../../../redux/actions/post";

function FeedItem({ post, user, likePost, deletePost }) {
  const dropdownMenu = (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="0">Edit post</Menu.Item>
      <Menu.Item key="1">Delete Post</Menu.Item>
    </Menu>
  );

  const handleLike = () => {
    likePost(post.id);
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "0":
        break;
      case "1":
        deletePost(post.id);
        break;
      default:
        break;
    }
  };

  return (
    <Row>
      <Col span={24} push={3}>
        <div className="feedItem">
          <div className="feedItem__header">
            <div className="feedItem__header--infor">
              <Avatar
                src={
                  post.userImageUrl &&
                  `http://localhost:5000/images/${post.userImageUrl}`
                }
              />
              <div className="feedItem__header--inforText">
                <p>
                  <span>{post.username}</span> just created a post
                </p>
                <small>
                  <ReactTimeAgo date={post.created_at} locale="en-US" />
                </small>
              </div>
            </div>
            <div className="feedItem__header--action">
              {user.username !== post.username ? (
                ""
              ) : (
                <Dropdown
                  overlay={dropdownMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <MoreOutlined style={{ fontSize: "32px" }} />
                </Dropdown>
              )}
            </div>
          </div>
          <div className="feedItem__content">
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              {post.content}
            </Typography.Paragraph>
          </div>
          <div className="feedItem__image">
            {post.imageUrl ? (
              <Image src={`http://localhost:5000/images/${post.imageUrl}`} />
            ) : (
              ""
            )}
          </div>
          <div className="feedItem__footer">
            <div className="feedItem__footer--infor">
              {post.like.includes(user.email) ? (
                <LikeFilled
                  style={{ fontSize: "24px", marginRight: "0.5rem" }}
                />
              ) : (
                <LikeOutlined
                  style={{ fontSize: "24px", marginRight: "0.5rem" }}
                  onClick={handleLike}
                />
              )}
              <Typography.Text>
                {post.like ? post.like.length : 0} likes
              </Typography.Text>
            </div>
            <div className="feedItem__footer--infor">
              <CommentOutlined
                style={{ fontSize: "24px", marginRight: "0.5rem" }}
              />
              <Typography.Text>15 comments</Typography.Text>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

FeedItem.prototype = {
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { likePost, deletePost })(FeedItem);
