import React from "react";
import "./feedItem.css";
import { Avatar, Image, Typography } from "antd";
import { Menu, Dropdown,Row,Col } from "antd";
import { MoreOutlined, LikeOutlined, CommentOutlined } from "@ant-design/icons";

const dropdownMenu = (
  <Menu>
    <Menu.Item key="0">Edit post</Menu.Item>
    <Menu.Item key="1">Delete Post</Menu.Item>
  </Menu>
);

function FeedItem() {

  return (
    <Row>
      <Col span={24} push={3}>
          <div className="feedItem">
          <div className="feedItem__header">
            <div className="feedItem__header--infor">
              <Avatar src="" />
              <div className="feedItem__header--inforText">
                <p>
                  <span>Nguyen Khac lam</span> just created a post
                </p>
                <small>5 hours ago</small>
              </div>
            </div>
            <div className="feedItem__header--action">
              <Dropdown
                overlay={dropdownMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <MoreOutlined style={{ fontSize: "32px" }} />
              </Dropdown>
            </div>
          </div>
          <div className="feedItem__content">
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
            >
              I've created a poll to ask all of you what you would like to see more
              in my upcoming videos! It will only take a couple of seconds...thanks
              to all in advance!! Sorry everyone, but from now on, I will only be
              able to edit and upload one design tutorial per month. This happens
              because I'm having a lot on my plate right now and recording and
              editing the tutorials requiere a lot of attention.
            </Typography.Paragraph>
          </div>
          <div className="feedItem__image">
            <Image src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg" />
          </div>
          <div className="feedItem__footer">
            <div className="feedItem__footer--infor">
              <LikeOutlined style={{ fontSize: "24px", marginRight: "0.5rem" }} />
              <Typography.Text>15 likes</Typography.Text>
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

export default FeedItem;
