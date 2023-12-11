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
    pagePath: navigations.LOGIN,
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
    pagePath: navigations.PROFILE,
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
    pagePath: navigations.DASHBOARD,
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
    pagePath: navigations.ROUND_ONE,
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
    pagePath: navigations.ROUND_TWO,
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
    pagePath: navigations.FORGOT_PASSWORD,
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
    pagePath: navigations.CREATE_NEW_PASSWORD,
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
    pagePath: navigations.SIGN_UP,
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
    pagePath: navigations.SIGNUP_SECOUND_SCREEN,
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
    pagePath: navigations.LOGIN_FORM,
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
    pagePath: navigations.SIGNUP_THIRD_SCREEN,
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
    pagePath: navigations.SIGNUP_LAST_SCREEN,
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
