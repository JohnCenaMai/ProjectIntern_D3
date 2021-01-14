import React, { Fragment } from "react";
import { Row, Col, Typography } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./match.css";
import TinderCards from "../../common/tinderCards/tinderCard";
import SwipeButtons from "../../common/tinderCards/swipeButton";

function Match() {
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="match">
            <TinderCards />
            <SwipeButtons />
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Match;
