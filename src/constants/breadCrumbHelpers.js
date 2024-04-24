import { navigations } from "./routeNames";

const getBreadCrumbDetails = ({ path, isEditMode, params, currentModule }) => {
  const { job_id, id } = params;
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
          label: isEditMode ? "Edit Company Profile" : "View Company Profile",
        },
      ];
    }
    case `/${currentModule}/${navigations.JOB_APPLICANTS}/${job_id}/applicant-details/${id}`: {
      return [
        { path: navigations.JOB_APPLICANTS, label: "Job Applicants Listing" },
        {
          path: navigations.APPLICANT_DETAILS,
          label: "View Job Applicant Details",
        },
      ];
    }
    case `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CAMPUS_INTERVIEW_MANAGEMENT}`: {
      return [
        { path: navigations.ROUND_ONE, label: "Round 1" },
        {
          path: navigations.CAMPUS_INTERVIEW_MANAGEMENT,
          label: "Campus Interview Management",
        },
      ];
    }
    case `/${currentModule}/${navigations.ROUND_ONE}/${navigations.CONSENT_MARKING_MANAGEMENT}`: {
      return [
        { path: navigations.ROUND_ONE, label: "Round 1" },
        {
          path: navigations.CAMPUS_INTERVIEW_MANAGEMENT,
          label: "Concent Marking Management",
        },
      ];
    }

    default:
      return [];
  }
};

export default getBreadCrumbDetails;
