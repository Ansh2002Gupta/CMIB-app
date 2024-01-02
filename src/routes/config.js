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
import JobsView from "../views/JobsView/JobsView";
import JobApplicants from "../views/JobApplicants/JobApplicants";
import JobSeekers from "../views/JobSeekers/JobSeekers";
import LoginScreen from "../views/LoginScreen/index";
import PostedJobs from "../views/PostedJobs/PostedJobs";
import RoundOne from "../views/RoundOneView";
import RoundTwo from "../views/RoundTwoView";
import SignUpScreen from "../views/SignUpView/index";
import SavedCandidates from "../views/SavedCandidates/SavedCandidates";
import WebViewScreen from "../views/WebViewScreen/index";

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
    pagePath: navigations.POSTED_JOBS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <PostedJobs />,
      },
    ],
  },
  {
    pagePath: navigations.JOB_SEEKERS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <JobSeekers />,
      },
    ],
  },
  {
    pagePath: navigations.JOB_APPLICANTS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <JobApplicants />,
      },
    ],
  },
  {
    pagePath: navigations.SAVED_CANDIDATES,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <SavedCandidates />,
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
