import React from "react";

import ContentLayout from "../pages/ContentLayout";
import CreateNewPassword from "../views/CreateNewPassword/index";
import DashboardView from "../views/Dashboard";
import ForgotPassword from "../views/ForgotPassword/index";
import Home from "../pages/Home";
import HeaderWithContentLayout from "../pages/HeaderWithContentLayout";
import LoginForm from "../views/LoginForm";
import LoginScreen from "../views/LoginScreen/index";
import ProfileView from "../views/Profile";
import RoundOne from "../views/RoundOneView";
import RoundTwo from "../views/RoundTwoView";
import SignUpScreen from "../views/SignUp/SignUpWelcomeScreen/index";
import SignUpSecondScreen from "../views/SignUp/SignUpSecondScreen/index";
import SignUpThirdScreen from "../views/SignUp/SignUpThirdScreen/index";
import SignUpLastScreen from "../views/SignUp/SignUpLastScreen/index";
import { navigations } from "../constants/routeNames";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";

const HomeWithPrivateAccess = withPrivateAccess(Home);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(ContentLayout);

const config = [
  {
    pagePath: navigations.Login,
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
    pagePath: navigations.Profile,
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
    pagePath: navigations.Dashboard,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <DashboardView />, // view
      },
    ],
  },
  {
    pagePath: navigations.RoundOne,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <RoundOne />, // view
      },
    ],
  },
  {
    pagePath: navigations.RoundTwo,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <RoundTwo />, // view
      },
    ],
  },
  {
    pagePath: navigations.ForgotPassword,
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
    pagePath: navigations.CreateNewPassword,
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
    pagePath: navigations.Signup,
    element: <SignUpWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpScreen />, // view
      },
    ],
  },
  {
    pagePath: navigations.SignupSecondScreen,
    element: <SignUpWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpSecondScreen />, // view
      },
    ],
  },
  {
    pagePath: navigations.LoginForm,
    element: <LoginForm />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <LoginForm />, // view
      },
    ],
  },
  {
    pagePath: navigations.SignupThirdScreen,
    element: <SignUpWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: "",
        element: <SignUpThirdScreen />, // view
      },
    ],
  },
  {
    pagePath: navigations.SignupLastScreen,
    element: <SignUpWithPublicAccess />, // Page
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
