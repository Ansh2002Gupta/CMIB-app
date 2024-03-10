import { navigations } from "./routeNames";
import { EDIT } from "./constants";

const getBreadCrumbDetails = ({ path, searchParams }) => {
  switch (path) {
    case `${navigations.TICKETS}/${navigations.TICKETS_VIEW_EDIT}`: {
      return [
        { path: navigations.TICKETS, label: "Tickets" },
        { path: navigations.TICKETS_VIEW_EDIT, label: "Ticket Details" },
      ];
    }
    case navigations.COMPANY_PROFILE: {
      return [
        { path: navigations.MODULE_LANDING_PAGE, label: "Dashboard" },
        {
          path: navigations.COMPANY_PROFILE,
          label:
            searchParams === EDIT
              ? "Edit Company Profile"
              : "View Company Profile",
        },
      ];
    }
    default:
      return [];
  }
};

export default getBreadCrumbDetails;
