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
import { loadStripe } from "@stripe/stripe-js";
import "./payment.css";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSercet, setClientSercet] = useState("");

  useEffect(() => {
    const getClientSercet = async () => {
      console.log("getClientSercet");
      const response = await api.post(`/payment/create?total=20000`);
      setClientSercet(response.data.clientSecret);
    };
    getClientSercet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");

    const payload = await stripe
      .confirmCardPayment(clientSercet, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);
      });
  };

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

export default Checkout;
