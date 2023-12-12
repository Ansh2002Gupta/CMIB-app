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
import SignUpScreen from "../views/SignUp/SignUpWelcomeScreen/index";
import MyAccountScreen from "../views/MyAccount/index";
import ViewProfile from "../views/ViewProfile/index";
import SignUpSecondScreen from "../views/SignUp/SignUpSecondScreen/index";
import SignUpThirdScreen from "../views/SignUp/SignUpThirdScreen/index";
import SignUpLastScreen from "../views/SignUp/SignUpLastScreen/index";
import CompanyProfile from "../views/CompanyProfile/index";
import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import ContentLayout from "../pages/ContentLayout";

// const AuthWithPublicAccess = withPublicAccess(Auth);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(ContentLayout);
const HomeWithPrivateAccess = withPrivateAccess(Home);
const ContentRouteWithPrivateAccess = withPrivateAccess(ContentLayout);

const config = [
  {
    pagePath: "/",
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <LoginScreen />,
      },
    ],
  },
  {
    pagePath: "/account",
    element: <ContentRouteWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <MyAccountScreen />,
      },
    ],
  },
  {
    pagePath: "/viewprofile",
    element: <ContentRouteWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <ViewProfile />,
      },
    ],
  },
  {
    pagePath: "/companyProfile",
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <CompanyProfile />,
      },
    ],
  },
  {
    pagePath: "/forgotPassword",
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    pagePath: "/createNewPassword",
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <CreateNewPassword />,
      },
    ],
  },
  {
    pagePath: "/signup",
    element: <SignUpWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <SignUpScreen />,
      },
    ],
  },
  {
    pagePath: "/signupSecondScreen",
    element: <SignUpWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <SignUpSecondScreen />,
      },
    ],
  },
  {
    pagePath: "/signupThirdScreen",
    element: <SignUpWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <SignUpThirdScreen />,
      },
    ],
  },
  {
    pagePath: "/signupLastScreen",
    element: <SignUpWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <SignUpLastScreen />,
      },
    ],
  },
];

export default config;
