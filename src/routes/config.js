import React from "react";

import DashboardView from "../views/Dashboard";
import ProfileView from "../views/Profile";
import LoginForm from "../views/LoginForm";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import SignUpScreen from "../views/SignUp/SignUpWelcomeScreen/index";
import MyAccountScreen from "../views/MyAccount/index";
import ViewProfile from "../views/ViewProfile/index";
import SignUpSecondScreen from "../views/SignUp/SignUpSecondScreen/index";
import SignUpThirdScreen from "../views/SignUp/SignUpThirdScreen/index";
import SignUpLastScreen from "../views/SignUp/SignUpLastScreen/index";

const AuthWithPublicAccess = withPublicAccess(Auth);
const HomeWithPrivateAccess = withPrivateAccess(Home);

const config = [
  {
    pagePath: "/example",
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "route",
        element: <div>Example Route</div>,
      },
      {
        viewPath: "route1",
        element: <div>Example Route1</div>,
      },
    ],
  },
  {
    pagePath: "/",
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <MyAccountScreen />, // view
      },
    ],
  },
  {
    pagePath: "/viewprofile",
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <ViewProfile />, // view
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
    pagePath: "/login",
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <LoginForm />, // view
      },
    ],
  },
  {
    pagePath: "/signup",
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpScreen />, // view
      },
    ],
  },
  {
    pagePath: "/signupSecondScreen",
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpSecondScreen />, // view
      },
    ],
  },
  {
    pagePath: "/signupThirdScreen",
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpThirdScreen />, // view
      },
    ],
  },
  {
    pagePath: "/signupLastScreen",
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpLastScreen />, // view
      },
    ],
  },
];

export default config;
