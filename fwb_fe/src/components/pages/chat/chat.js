import React, { Fragment } from "react";
import { Row, Col, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./chat.css";

function Chat() {
  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <div className="chats">
            <Typography.Title level={3}>Chats</Typography.Title>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Chat;
