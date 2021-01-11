import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const routes = [
    {
        path: "/login",
        component: "./authentication/login/login"
    },
    {
        path: "/filter",
        component: "./pages/Filter/filter"
    }
];

export default routes;