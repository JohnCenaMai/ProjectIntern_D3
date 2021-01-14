import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authentication/login";
import HomePage from "./components/pages/home/homepage";
import FeedPage from "./components/pages/feed/feedpage";
import Chat from "./components/pages/chat/chat";
import Match from "./components/pages/match/match";
import MyProfile from "./components/pages/userProfile/myProfile";
import EditProfile from "./components/pages/editProfile/editProfile";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/find-near-you">
            <HomePage />
          </Route>
          <Route path="/matches">
            <Match />
          </Route>
          <Route path="/me/edit">
            <EditProfile />
          </Route>
          <Route path="/me">
            <MyProfile />
          </Route>
          <Route path="/feeds">
            <FeedPage />
          </Route>
          <Route path="/message">
            <Chat />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
