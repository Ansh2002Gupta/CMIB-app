import { navigations } from "./routeNames";
import images from "../images";

export const items = [
  // TODO data will replace with API data
  {
    id: 0,
    title: "2023 Aug - Sept Campus Placement",
  },
  {
    id: 1,
    title: "2023 Feb - Mar Campus Placement",
  },
  {
    id: 2,
    title: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 3,
    title: "2022 Feb - Mar Campus Placement",
  },
  {
    id: 4,
    title: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 5,
    title: "2022 Feb - Mar Campus Placement",
  },
  {
    id: 6,
    title: "2022 Aug - Sept Campus Placement",
  },
  {
    id: 7,
    title: "2022 Feb - Mar Campus Placement",
  },
];

export const weblisting = [
  // TODO data will replace with API data
  {
    id: 0,
    title: "Dashboard",
  },
  {
    id: 1,
    title: "Global configs",
  },
  {
    id: 2,
    title: "Candidates",
  },
  {
    id: 3,
    title: "Companies",
  },
  {
    id: 4,
    title: "Payments",
  },
  {
    id: 5,
    title: "Roster",
  },
  {
    id: 6,
    title: "Report",
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
  { label: "Posted Jobs", key: navigations.POSTED_JOBS, icon: "iconPostedJobs" },
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
    visible: false,
  },
  {
    label: "CA Jobs",
    key: "ca-jobs",
    children: caJobsMenu,
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
    visible: false,
    isSubMenu: true,
  },
  {
    key: "women-part-time",
    label: "Women PartTime",
    children: experiencedMembersMenu,
    visible: false,
    isSubMenu: true,
  },
  {
    key: "overseas-chapters",
    label: "Overseas Chapters",
    children: experiencedMembersMenu,
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
      activeImage: images.iconDashboard,
      inactiveImage: images.iconDashboard,
    },
    iconRound1: {
      activeImage: images.iconActiveRound1,
      inactiveImage: images.iconRound1,
    },
    iconRound2: {
      activeImage: images.iconActiveRound2,
      inactiveImage: images.iconRound2,
    },
    iconPostedJobs: {
      activeImage: images.iconActivePostedJobs,
      inactiveImage: images.iconPostedJobs,
    },
    iconCandidates: {
      activeImage: images.iconActiveCandidates,
      inactiveImage: images.iconCandidates,
    },
    // ... other icon mappings
  };
  return iconMap[iconName] || { activeImage: null, inactiveImage: null };
};
