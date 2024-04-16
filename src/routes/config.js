import React from "react";
import { Platform } from "@unthinkable/react-core-components";

import Candidates from "../views/Candidates";
import AddModifyNewJobs from "../views/AddModifyNewJobs/index";
import AppliedJobsView from "../views/AppliedJobsView";
import ContentLayout from "../pages/ContentLayout";
import SavedJobs from "../views/SavedJobs";
import DashboardView from "../views/Dashboard";
import MyAccount from "../views/MyAccount";
import ViewProfile from "../views/ViewProfile";
import CompanyProfile from "../views/CompanyProfile";
import DefaultRoute from "./Components/DefaultRoute";
import ForgotPassword from "../views/ForgotPassword/index";
import FeedbackView from "../views/FeedbackView";
import HeaderWithContentLayout from "../pages/HeaderWithContentLayout";
import Jobs from "../views/Jobs";
import JobsView from "../views/JobsView/JobsView";
import JobApplicantsView from "../views/JobApplicantsView";
import JobSeekers from "../views/JobSeekers";
import JobProfileTab from "../views/JobProfile";
import JobApplicantsDetails from "../views/JobApplicantsDetails";
import LoginScreen from "../views/LoginScreen/index";
import PostedJobsView from "../views/PostedJobsView/index";
import RedirectToAccessedModule from "../routes/Components/RedirectToAccessedModule";
import RoundOne from "../views/RoundOneView";
import RoundOneApplicationForm from "../views/RoundOneApplicationForm";
import RoundTwo from "../views/RoundTwoView";
import SavedCandidatesView from "../views/SavedCandidatesView/index";
import SignUpScreen from "../views/SignUpView/index";
import TicketListing from "../views/TicketsListing/index";
import TicketChatScreen from "../views/TicketChatScreen";
import WebViewScreen from "../views/WebViewScreen/index";

import withPrivateAccess from "../hocs/withPrivateAccess";
import withPublicAccess from "../hocs/withPublicAccess";
import { navigations } from "../constants/routeNames";
import ViewDetailsScreen from "../containers/ViewDetailsScreen";
import ViewPostedJobDetails from "../views/ViewPostedJobDetails/ViewPostedJobDetails";
import PostedJobs from "../views/PostedJobs";
import AllJobs from "../views/AllJobs/AllJobs";

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
        viewPath: navigations.REDIRECT,
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
    pagePath: navigations.JOB_PROFILE,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <JobProfileTab />,
      },
    ],
  },
  {
    pagePath: navigations.TICKETS,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <TicketListing />,
      },
      {
        viewPath: navigations.TICKETS_VIEW_EDIT,
        element: <TicketChatScreen />,
      },
    ],
  },

  {
    pagePath: navigations.FEEDBACK,
    element: <HomeWithPrivateAccess doesExcludeHeader />,
    views: [
      {
        viewPath: "",
        element: <FeedbackView />,
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
    pagePath: navigations.REDIRECT,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: "",
        element: <RedirectToAccessedModule />,
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
  {
    pagePath: navigations.NQCA,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: navigations.MODULE_LANDING_PAGE,
        element: <DashboardView />,
      },
      {
        viewPath: navigations.ROUND_ONE,
        element: <RoundOne />,
      },
      {
        viewPath: `${navigations.ROUND_ONE}/${navigations.APPLICATION_FORM}`,
        element: <RoundOneApplicationForm />,
      },
      {
        viewPath: navigations.ROUND_TWO,
        element: <RoundTwo />,
      },
    ],
  },
  {
    pagePath: navigations.CA_JOBS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: navigations.MODULE_LANDING_PAGE,
        element: <DashboardView />,
      },
      {
        viewPath: navigations.POSTED_JOBS,
        element: <PostedJobsView />,
      },
      {
        viewPath: `${navigations.POSTED_JOBS}/${navigations.ADD_NEW_JOBS}`,
        element: <AddModifyNewJobs />,
      },
      {
        viewPath: `${navigations.DETAILS_JOBS}`,
        element: <ViewPostedJobDetails />,
      },
      {
        viewPath: `${navigations.JOBS}/${navigations.APPLICANT_DETAILS}`,
        element: <JobApplicantsDetails />,
      },
      {
        viewPath: navigations.APPLIED_JOBS,
        element: <AppliedJobsView />,
      },
      {
        viewPath: navigations.JOB_APPLICANTS,
        element: <JobApplicantsView />,
      },
      {
        viewPath: `${navigations.JOB_APPLICANTS}/${navigations.APPLICANT_DETAILS}`,
        element: <JobApplicantsDetails />,
      },
      {
        viewPath: navigations.JOB_SEEKERS,
        element: <JobSeekers />,
      },
      {
        viewPath: navigations.JOB_SEEKERS + navigations.CANDIDATE_DETAILS,
        element: <ViewDetailsScreen />,
      },
      {
        viewPath: navigations.SAVED_CANDIDATES,
        element: <SavedCandidatesView />,
      },
      {
        viewPath: navigations.SAVED_JOBS,
        element: <SavedJobs />,
      },
      {
        viewPath: navigations.ALL_JOBS,
        element: <AllJobs />,
      },
      {
        viewPath: navigations.APPLIED_JOBS,
        element: <PostedJobsView />,
      },
      {
        viewPath: `${navigations.JOB_DETAIL}/:jobId`,
        element: <PostedJobs />,
      },
      {
        viewPath: navigations.JOBS,
        element: <Jobs />,
      },
      {
        viewPath: navigations.CANDIDATES,
        element: <Candidates />,
      },
    ],
  },
  {
    pagePath: navigations.CAREER_ASCENT,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: navigations.MODULE_LANDING_PAGE,
        element: <DashboardView />,
      },
      {
        viewPath: navigations.ROUND_ONE,
        element: <RoundOne />,
      },
    ],
  },
  {
    pagePath: navigations.WOMEN_PARTTIME,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: navigations.MODULE_LANDING_PAGE,
        element: <DashboardView />,
      },
      {
        viewPath: navigations.ROUND_ONE,
        element: <RoundOne />,
      },
    ],
  },
  {
    pagePath: navigations.OVERSEES_CHAPTERS,
    element: <HomeWithPrivateAccess />,
    views: [
      {
        viewPath: navigations.MODULE_LANDING_PAGE,
        element: <DashboardView />,
      },
      {
        viewPath: navigations.ROUND_ONE,
        element: <RoundOne />,
      },
    ],
  },
];

export default config;
