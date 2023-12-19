import React from "react";

import ContentLayout from "../pages/ContentLayout";
import CreateNewPassword from "../views/CreateNewPassword/index";
import DashboardView from "../views/Dashboard";
import MyAccount from "../views/MyAccount";
import ViewProfile from "../views/ViewProfile";
import CompanyProfile from "../views/CompanyProfile";
import DefaultRoute from "./Components/DefaultRoute";
import ForgotPassword from "../views/ForgotPassword/index";
import HeaderWithContentLayout from "../pages/HeaderWithContentLayout";
import Home from "../pages/Home";
import JobsView from "../views/JobsView/JobsView";
import LoginScreen from "../views/LoginScreen/index";
import ProfileView from "../views/Profile";
import RoundOne from "../views/RoundOneView";
import RoundTwo from "../views/RoundTwoView";
import SignUpScreen from "../views/SignUpView/index";
import WebViewScreen from "../views/WebViewScreen/WebViewScreen";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import { navigations } from "../constants/routeNames";

const HomeWithPrivateAccess = withPrivateAccess(HeaderWithContentLayout);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(ContentLayout);
const ContentRouteWithPrivateAccess = withPrivateAccess(ContentLayout);

const config = [
  {
    pagePath: navigations.ROOT,
    element: <DefaultRoute />,
    views: [
      {
        viewPath: "",
        element: <DefaultRoute />,
      },
    ],
  },
  {
    pagePath: navigations.PROFILE,
    element: <HomeWithPrivateAccess />, // Page
    views: [
      {
        viewPath: "",
        element: <MyAccount />,
      },
    ],
  },
  {
    pagePath: navigations.Web_View,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <WebViewScreen />,
      },
    ],
  },
  {
    pagePath: navigations.VIEW_PROFILE,
    element: <ContentRouteWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <ViewProfile />,
      },
    ],
  },
  {
    pagePath: navigations.COMPANY_PROFILE,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <CompanyProfile />,
      },
    ],
  },
  {
    pagePath: navigations.DASHBOARD,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <DashboardView />,
      },
    ],
  },
  {
    pagePath: navigations.ROUND_ONE,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <RoundOne />,
      },
    ],
  },
  {
    pagePath: navigations.ROUND_TWO,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <RoundTwo />,
      },
    ],
  },
  {
    pagePath: navigations.FORGOT_PASSWORD,
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    pagePath: navigations.CREATE_NEW_PASSWORD,
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <CreateNewPassword />,
      },
    ],
  },
  {
    pagePath: navigations.SIGN_UP,
    element: <SignUpWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <SignUpScreen />,
      },
    ],
  },
  {
    pagePath: navigations.LOGIN,
    element: <LoginWithPublicAccess />,
    views: [
      {
        viewPath: "",
        element: <LoginScreen />,
      },
    ],
  },
  {
    pagePath: navigations.JOBS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <JobsView />,
      },
    ],
  },
  {
    pagePath: navigations.OUT_SOURCED,
    element: <DefaultRoute />,
    views: [
      {
        viewPath: "",
        element: <DefaultRoute />,
      },
    ],
  },
];

export default config;
