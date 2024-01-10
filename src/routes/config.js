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
import JobsView from "../views/JobsView/JobsView";
import JobApplicantsView from "../views/JobApplicantsView/index";
import JobSeekersView from "../views/JobSeekersView/index";
import LoginScreen from "../views/LoginScreen/index";
import PostedJobsView from "../views/PostedJobsView/index";
import RoundOne from "../views/RoundOneView";
import RoundOneApplicationForm from "../views/RoundOneApplicationForm";
import RoundTwo from "../views/RoundTwoView";
import SavedCandidatesView from "../views/SavedCandidatesView/index";
import SignUpScreen from "../views/SignUpView/index";
import TicketsView from '../views/TicketsView/index'
import WebViewScreen from "../views/WebViewScreen/index";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import { navigations } from "../constants/routeNames";

const signUpHeader =
  Platform.OS === "web" ? HeaderWithContentLayout : ContentLayout;

const HomeWithPrivateAccess = withPrivateAccess(HeaderWithContentLayout);
const LoginWithPublicAccess = withPublicAccess(HeaderWithContentLayout);
const SignUpWithPublicAccess = withPublicAccess(signUpHeader);

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
        viewPath: navigations.DASHBOARD,
        element: <HomeWithPrivateAccess />,
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
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <ViewProfile />,
      },
    ],
  },
  {
    pagePath: navigations.COMPANY_PROFILE,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <CompanyProfile />,
      },
    ],
  },
  {
    pagePath: navigations.TICKETS,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <TicketsView />,
      },
    ],
  },
  {
    pagePath: navigations.APPLICATION_FORM,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <RoundOneApplicationForm />,
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
      {
        viewPath: "applicationForm",
        element: <RoundOneApplicationForm />,
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
        element: <PostedJobsView />,
      },
    ],
  },
  {
    pagePath: navigations.JOB_SEEKERS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <JobSeekersView />,
      },
    ],
  },
  {
    pagePath: navigations.JOB_APPLICANTS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <JobApplicantsView />,
      },
    ],
  },
  {
    pagePath: navigations.SAVED_CANDIDATES,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <SavedCandidatesView />,
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
