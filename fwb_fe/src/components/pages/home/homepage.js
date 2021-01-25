import React, { Fragment } from "react";
import "antd/dist/antd.css";
import { Row, Col, Avatar } from "antd";
import Sidebar from "../../common/sidebar/sider";
import Header from "../../common/header/header";

function HomePage() {
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <Header />
          <Row>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              className="profile"
            />
          </Row>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default HomePage;
