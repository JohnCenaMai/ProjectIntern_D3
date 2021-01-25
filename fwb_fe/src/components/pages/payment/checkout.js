import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Typography, Carousel, Button, Card } from "antd";
import Sidebar from "../../common/sidebar/sider";
import api from "./../../../utils/api";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { joinPremium } from "./../../../redux/actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./payment.css";
import { message } from "antd";
import { useHistory } from "react-router";

function Checkout({ joinPremium }) {
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSercet, setClientSercet] = useState("");

  useEffect(() => {
    const getClientSercet = async () => {
      const response = await api.post(`/payment/create?total=20000`);
      setClientSercet(response.data.clientSecret);
    };
    getClientSercet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = await stripe
      .confirmCardPayment(clientSercet, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);
        joinPremium(
          paymentIntent.payment_method_types[0],
          paymentIntent.amount
        );
      });
    message.success("Welcome you to join premium");
    history.push("/find-near-you");
  };

  console.log(clientSercet);
  return (
    <Fragment>
      <Row>
        <Col span={19} push={5}>
          <div className="checkout">
            <form onSubmit={handleSubmit}>
              <Card title="Pay with card" className="checkout__card">
                <CardElement />
              </Card>
              <Button htmlType="submit" className="checkout__btn">
                Buy
              </Button>
            </form>
          </div>
        </Col>
        <Col span={5} pull={19}>
          <Sidebar />
        </Col>
      </Row>
    </Fragment>
  );
}

Checkout.propTypes = {
  joinPremium: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { joinPremium })(Checkout);
