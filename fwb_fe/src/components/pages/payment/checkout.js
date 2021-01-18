import React, { Fragment } from "react";
import { Row, Col, Typography, Carousel, Button } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./payment.css";

function Checkout() {
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="checkout">Checkout</div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Checkout;
