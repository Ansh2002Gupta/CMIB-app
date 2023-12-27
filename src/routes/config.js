import React from "react";
import { Platform } from "@unthinkable/react-core-components";

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
import WebViewScreen from "../views/WebViewScreen/index";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import { navigations } from "../constants/routeNames";

const HomeWithPrivateAccess = withPrivateAccess(Home);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(Platform.OS.toLowerCase() === "web" ? HeaderWithContentLayout : ContentLayout);
const ContentRouteWithPrivateAccess = withPrivateAccess(ContentLayout);

const config = [
   {
    pagePath: navigations.ROOT,
    element: <DefaultRoute />,
    views: [
      {
        viewPath: navigations.LOGIN,
        element: <LoginWithPublicAccess />,
      },
      {
        viewPath:navigations.DASHBOARD,
        element:<HomeWithPrivateAccess />,
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
    pagePath: navigations.PROFILE,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <MyAccount />,
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
    element: <ContentRouteWithPrivateAccess />,
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
  {
    pagePath: navigations.WEB_VIEW,
    element: <WebViewScreen />,
    views: [
      {
        viewPath: "",
        element: <WebViewScreen />,
      },
    ],
  },
];

export default config;
