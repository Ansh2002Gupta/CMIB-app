import React from "react";

import DashboardView from "../views/Dashboard";
import ProfileView from "../views/Profile";
import LoginForm from "../views/LoginForm";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import HeaderWithContentLayout from "../pages/HeaderWithContentLayout";
import LoginScreen from "../views/LoginScreen/index";
import ForgotPassword from "../views/ForgotPassword/index";

import CreateNewPassword from "../views/CreateNewPassword/index";
import SignUpScreen from "../views/SignUpView/index";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import ContentLayout from "../pages/ContentLayout";

// const AuthWithPublicAccess = withPublicAccess(Auth);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(ContentLayout);
const HomeWithPrivateAccess = withPrivateAccess(Home);

const config = [
  {
    pagePath: "/",
    element: <LoginWithPublicAccess />, // Page
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
    element: <LoginWithPublicAccess />, // Page
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
    element: <LoginWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <CreateNewPassword />, // view
      },
    ],
  },
  {
    pagePath: "/signup",
    element: <SignUpWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpScreen />, // view
      },
    ],
  },
];

export default config;
