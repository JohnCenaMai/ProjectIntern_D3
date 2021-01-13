import React, { Fragment } from "react";
import { Row, Col, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import RecentChatItem from "./../../common/recentChat/recentChat";
import { Input } from "antd";
import "./chat.css";

function Chat() {
  return (
    <Fragment>
      <Row>
        <Col span={13} push={5}>
          <div className="chats"></div>
        </Col>
        <Col span={6} push={5}>
          <div className="chats__sidebar">
            <Input.Search
              placeholder="Search conversation..."
              size="large"
              enterButton
              loading={false}
            />
            <div className="recentChats">
              <Typography.Title level={5}>Recent chats</Typography.Title>

              <RecentChatItem />
            </div>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Chat;
