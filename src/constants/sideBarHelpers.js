import { navigations } from "./routeNames";
import images from "../images";

export const items = [
  // TODO data will replace with API data
  {
    id: 0,
    label: "2023 Aug - Sept Campus Placement",
  },
  {
    id: 1,
    label: "2023 Feb - Mar Campus Placement",
  },
  {
    id: 2,
    label: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 3,
    label: "2022 Feb - Mar Campus Placement",
  },
  {
    id: 4,
    label: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 5,
    label: "2022 Feb - Mar Campus Placement",
  },
  {
    id: 6,
    label: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 7,
    label: "2022 Feb - Mar Campus Placement",
  },
];

const newlyQualifiedPlacementsMenu = [
  { label: "Dashboard", key: navigations.DASHBOARD, icon: "iconDashboard" },
  {
    label: "Round 1 ",
    key: "/round-one",
    icon: "iconRound1",
  },
  {
    label: "Round 2 ",
    key: "/round-two",
    icon: "iconRound2",
  },
];

const caJobsMenu = [
  { label: "Dashboard", key: navigations.DASHBOARD, icon: "iconDashboard" },
  {
    label: "Posted Jobs",
    key: navigations.POSTED_JOBS,
    icon: "iconPostedJobs",
  },
  {
    label: "Job Applicants",
    key: navigations.JOB_APPLICANTS,
    icon: "iconJobApplicants",
  },
  {
    label: "Job Seekers",
    key: navigations.JOB_SEEKERS,
    icon: "iconJobSeekers",
  },
  {
    label: "Saved Candidates",
    key: navigations.SAVED_CANDIDATES,
    icon: "iconSaved",
  },
];

const experiencedMembersMenu = [
  { label: "Dashboard", key: navigations.DASHBOARD, icon: "iconDashboard" },
  {
    label: "Round 1 ",
    key: navigations.ROUND_ONE,
    icon: "iconRound1",
  },
];

// TODO: need to add role based menu
export const modules = [
  {
    label: "Newly Qualified Placements",
    key: "newly-qualified-placements",
    children: newlyQualifiedPlacementsMenu,
    session: items,
    visible: false,
  },
  {
    label: "CA Jobs",
    key: "ca-jobs",
    children: caJobsMenu,
    session: items,
    visible: false,
  },
  {
    label: "Experienced Members",
    key: "experienced-members",
    visible: false,
    sectionHeading: true,
  },
  {
    key: "career-ascent",
    label: "Career Ascent",
    children: experiencedMembersMenu,
    session: items,
    visible: false,
    isSubMenu: true,
  },
  {
    key: "women-part-time",
    label: "Women PartTime",
    children: experiencedMembersMenu,
    session: items,
    visible: false,
    isSubMenu: true,
  },
  {
    key: "overseas-chapters",
    label: "Overseas Chapters",
    children: experiencedMembersMenu,
    session: items,
    visible: false,
    isSubMenu: true,
  },
];

export const getAccessibleModulesList = ({
  allModules = [],
  accessibleModules = [],
}) => {
  return allModules.map((item1) => {
    var itemInAccessibleModule = accessibleModules.find(
      (item2) => item2?.name === item1?.label
    );
    if (itemInAccessibleModule) {
      item1.visible = true;
    }
    if (
      item1.sectionHeading &&
      (accessibleModules.includes("Career Ascent") ||
        accessibleModules.includes("Women PartTime") ||
        accessibleModules.includes("Overseas Chapters"))
    ) {
      item1.visible = true;
    }
    return item1;
  });
};

export const getIconImages = (iconName) => {
  const iconMap = {
    iconDashboard: {
      activeImage: images.iconDashboardActive,
      inactiveImage: images.iconDashboard,
      webInactiveImage: images.iconDashboardWeb,
    },
    iconRound1: {
      activeImage: images.iconActiveRound1,
      inactiveImage: images.iconRound1,
      webInactiveImage: images.iconRound1Web,
    },
    iconRound2: {
      activeImage: images.iconActiveRound2,
      inactiveImage: images.iconRound2,
      webInactiveImage: images.iconRound2Web,
    },
    iconPostedJobs: {
      activeImage: images.iconActivePostedJobs,
      inactiveImage: images.iconPostedJobs,
      webInactiveImage: images.iconPostedJobsWeb,
    },
    iconJobApplicants: {
      activeImage: images.iconJobApplicantsActive,
      webInactiveImage: images.iconJobApplicants,
    },
    iconJobSeekers: {
      activeImage: images.iconJobSeekersActive,
      webInactiveImage: images.iconJobSeekers,
    },
    iconSaved: {
      activeImage: images.iconSavedActive,
      webInactiveImage: images.iconSaved,
    },
    iconCandidates: {
      activeImage: images.iconActiveCandidates,
      inactiveImage: images.iconCandidates,
    },
    // ... other icon mappings
  };
  return (
    iconMap[iconName] || {
      activeImage: null,
      inactiveImage: null,
      webInactiveImage: null,
    }
  );
};
