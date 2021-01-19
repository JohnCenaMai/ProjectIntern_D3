import React, { Fragment, useState } from "react";
import { Row, Col, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./myMatching.css";

function MyMatching() {
  const [requests, setRequests] = useState([
    {
      username: "Nancy",
      imageUrl:
        "https://cynramedia.com/wp-content/uploads/2019/08/nancy-momoland-1-1-1024x800.jpg",
      createdAt: "12-12-2020",
      status: 0,
    },
    {
      username: "Nancy",
      imageUrl:
        "https://cynramedia.com/wp-content/uploads/2019/08/nancy-momoland-1-1-1024x800.jpg",
      createdAt: "12-12-2020",
      status: 0,
    },
  ]);

  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="myMatching">
            <Typography.Title level={4}>My matchings</Typography.Title>

            <div className="myMatching__request">
              <Typography.Title level={4}>Request(10)</Typography.Title>
              {requests.map((request) => (
                <div>
                  <Typography.Text>{request.username}</Typography.Text>
                </div>
              ))}
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

export default MyMatching;
