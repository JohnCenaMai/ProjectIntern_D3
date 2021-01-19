import React, { Fragment } from "react";
import Login from "./../authentication/login";
import HomePage from "./../pages/home/homepage";
import FeedPage from "./../pages/feed/feedpage";
import Chat from "./../pages/chat/chat";
import Match from "./../pages/match/match";
import ForgotPassword from "./../pages/forgotPassword/forgotPassword";
import MyMatching from "./../pages/myMatching/myMatching";
import MyProfile from "./../pages/userProfile/myProfile";
import EditProfile from "./../pages/editProfile/editProfile";
import { Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Payment from "../pages/payment/payment";
import Checkout from "../pages/payment/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function Routes(props) {
  const promise = loadStripe(
    "pk_test_51IAuM3BX9LsAfc8lOwZ4Qt6Yis3gqOv4puKxwj8GsE6z5OFSnUXSyEGC34FKqfU7SUnB9b48Dq6FpVgeo4YNIYri00X3mOoJ9W"
  );

  return (
    <div>
      <PrivateRoutes exact path="/find-near-you" component={HomePage} />
      <PrivateRoutes exact path="/matches" component={Match} />
      <PrivateRoutes exact path="/me/edit" component={EditProfile} />
      <PrivateRoutes exact path="/me" component={MyProfile} />
      <PrivateRoutes exact path="/feeds" component={FeedPage} />
      <PrivateRoutes exact path="/message" component={Chat} />
      <PrivateRoutes exact path="/payment" component={Payment} />
      <PrivateRoutes exact path="/checkout">
        <Elements stripe={promise}>
          <Checkout />
        </Elements>
      </PrivateRoutes>
      <Route exact path="/" component={Login} />
    </div>
  );
}

export default Routes;