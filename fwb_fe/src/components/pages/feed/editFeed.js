import React, { Fragment } from "react";
import { Row, Col, Typography, Empty, Button, Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Sidebar from "../../common/sidebar/sider";
import "./editFeed.css";
import { Link, useHistory } from "react-router-dom";

function EditFeed() {
  let history = useHistory();
  return (
    <Fragment>
      <Row>
        <Col span={5}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <button className="feeds__backLink" onClick={() => history.goBack()}>
            <LeftOutlined style={{ marginRight: "1rem" }} />
            Edit feed
          </button>
          <div className="editFeed"></div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default EditFeed;
