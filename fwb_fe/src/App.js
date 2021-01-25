import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/authentication/login";
import HomePage from "./components/pages/home/homepage";
import FeedPage from "./components/pages/feed/feedpage";
import Chat from "./components/pages/chat/chat";
import Match from "./components/pages/match/match";
import ForgotPassword from "./components/pages/forgotPassword/forgotPassword";
import MyMatching from "./components/pages/myMatching/myMatching";
import MyProfile from "./components/pages/userProfile/myProfile";
import EditProfile from "./components/pages/editProfile/editProfile";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getCookie } from "./utils/cookie";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import Routes from "./components/routes/Routes";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  useEffect(() => {
    if (getCookie("jwt")) {
      setAuthToken(getCookie("jwt"));
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
