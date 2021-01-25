import React, { Fragment } from "react";
import { Row, Col, Typography, Input, Form, Avatar, Button } from "antd";
import Sidebar from "../../common/sidebar/sider";
import RecentChatItem from "./../../common/recentChat/recentChat";
import {
  MessageOutlined,
  VideoCameraFilled,
  PhoneFilled,
} from "@ant-design/icons";
import "./chat.css";
import ChatConversation from "../../common/chatConservation/chatConversation";

function Chat() {
  const handleSubmit = (values) => {
    console.log("Submit", values.message);
  };

  return (
    <Fragment>
      <Row>
        <Col span={13} push={5}>
          <div className="chats">
            <Form
              name="message"
              onFinish={handleSubmit}
              className="chats__form"
            >
              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please type something!" }]}
              >
                <Input
                  prefix={<MessageOutlined />}
                  size="large"
                  placeholder="Type something..."
                />
              </Form.Item>
            </Form>

            <div className="chats__header">
              <div className="chats__headerLeft">
                <Avatar size={64} />
                <div className="chat__header--infor">
                  <Typography.Title level={3}>Nguyen Khac Lam</Typography.Title>
                  <Typography.Text>Last send: 10 hours ago</Typography.Text>
                </div>
              </div>

              <Button
                type="link"
                style={{
                  fontSize: "25px",
                  position: "absolute",
                  right: "17%",
                  top: "1%",
                  color: "#FF1493",
                }}
              >
                <PhoneFilled />
              </Button>

              <Button
                type="link"
                style={{
                  fontSize: "25px",
                  position: "absolute",
                  right: "10%",
                  top: "1%",
                  color: "#FF1493",
                }}
              >
                <VideoCameraFilled />
              </Button>
            </div>

            <ChatConversation />
          </div>
        </Col>
        <Col span={6} push={5}>
          <div className="chats__sidebar">
            <Input.Search
              placeholder="Search conversation..."
              size="medium"
              enterButton
              loading={false}
            />
            <div className="recentChats">
              <Typography.Title level={5}>Recent chats</Typography.Title>

              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
              <RecentChatItem />
            </div>
          </div>
        </Col>
        <Col span={5} pull={18}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Chat;
