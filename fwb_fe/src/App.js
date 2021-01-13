import React from "react";
import "./App.css";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Login from "./components/authentication/login";
import HomePage from "./components/pages/home/homepage";
import FeedPage from "./components/pages/feed/feedpage";
import Chat from "./components/pages/chat/chat";
import Match from "./components/pages/match/match";

function App() {
  return (
<Router>
        <Switch>
          <Route path="/find-near-you">
            <HomePage />
          </Route>
          <Route path="/matches">
            <Match />
          </Route>
          <Route path="/feeds">
            <FeedPage />
          </Route>
          <Route path="/message">
            <Chat />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
