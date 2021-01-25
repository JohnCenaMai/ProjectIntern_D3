import React, { Fragment } from "react";
import { Row, Col, Typography, Carousel, Button } from "antd";
import Sidebar from "../../common/sidebar/sider";
import "./payment.css";
import { Link } from "react-router-dom";

const imageBaseUrl = "https://howzuapp.com";

const carouselData = [
  {
    imageUrl: `${imageBaseUrl}/web/static/media/sub_morelike.078959ca.png`,
    text: "See who like you",
    description:
      "Likes You feature lets you see who likes you before you decide whether to Like or Nope",
  },
  {
    imageUrl: `${imageBaseUrl}/web/static/media/sub_profile.414ef91d.png`,
    text: "Hide your info",
    description: "You can hide your info like age, location, ... if you want",
  },
  {
    imageUrl: `${imageBaseUrl}/web/static/media/sud_add.a75eb23e.png`,
    text: "Turn off ad",
    description: "Have fun swiping with uninterrupted ads",
  },
];

function Payment() {
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="payment" style={{ textAlign: "center" }}>
            <Carousel autoplay className="payment__slider">
              {carouselData.map((item) => (
                <div className="payment__sliderItem">
                  <img src={item.imageUrl} alt="sliderItemImg" />
                  <Typography.Title level={3}>{item.text}</Typography.Title>
                  <Typography.Text>{item.text}</Typography.Text>
                </div>
              ))}
            </Carousel>
            <Button className="joinBtn">
              <Link to="/checkout">Join premium now</Link>
            </Button>
            <Typography.Title level={4}>200$/year</Typography.Title>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Payment;
