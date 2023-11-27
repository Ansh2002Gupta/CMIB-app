import React from "react";

import DashboardView from "../views/Dashboard";
import ProfileView from "../views/Profile";
import LoginForm from "../views/LoginForm";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import LoginScreen from "../views/LoginScreen";
import ForgotPassword from "../views/ForgotPassword";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import CreateNewPassword from "../views/CreateNewPassword";

const AuthWithPublicAccess = withPublicAccess(Auth);
const HomeWithPrivateAccess = withPrivateAccess(Home);

const config = [
  {
    pagePath: "/",
    element: <Login />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <LoginScreen />, // view
      },
    ],
  },
  {
    pagePath: "/profile",
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ProfileView />, // view
      },
    ],
  },
  {
    pagePath: "/forgotPassword",
    element: <Login />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ForgotPassword />, // view
      },
    ],
  },
  {
    pagePath: "/createNewPassword",
    element: <Login />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <CreateNewPassword />, // view
      },
    ],
  },
];

export default config;
