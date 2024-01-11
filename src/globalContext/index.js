import React from "react";
import authProvider from "./auth/authProvider";
import DashboardProvider from "./dashboard/dashboardProvider";
import LocaleProvider from "./locale/localeProviders";
import RouteProvider from "./route/routeProvider";
import SignUpProvider from "./signUp/signUpProvider";
import SideBarProvider from "./sidebar/sidebarProvider";
import UserProfileProvider from "./userProfile/userProfileProvider";
import TicketScreenProvider from "./ticketsScreen/ticketsScreenProvider";

// Import other created Providers and add them here -
const providers = [
  authProvider,
  DashboardProvider,
  LocaleProvider,
  RouteProvider,
  SignUpProvider,
  SideBarProvider,
  UserProfileProvider,
  TicketScreenProvider
];

const combineProviders = (components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

// Combining multiple providers to single provider - this will be wrapped around App.js
export default combineProviders(providers);
