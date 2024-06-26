import { navigations } from "./routeNames";
import images from "../images";

const newlyQualifiedPlacementsMenu = [
  {
    label: "Dashboard",
    key: navigations.MODULE_LANDING_PAGE,
    icon: "iconDashboard",
  },
  {
    label: "Round 1 ",
    key: navigations.ROUND_ONE,
    icon: "iconRound1",
  },
  {
    label: "Round 2 ",
    key: navigations.ROUND_TWO,
    icon: "iconRound2",
  },
];

const caJobsMenu = [
  {
    label: "Dashboard",
    key: navigations.MODULE_LANDING_PAGE,
    icon: "iconDashboard",
  },
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

const memberCaJobsMenu = [
  {
    label: "Dashboard",
    key: navigations.MODULE_LANDING_PAGE,
    icon: "iconDashboard",
  },
  {
    label: "Saved Jobs",
    key: navigations.SAVED_JOBS,
    icon: "iconSaved",
  },
  {
    label: "Applied Jobs",
    key: navigations.APPLIED_JOBS,
    icon: "iconAppliedJobs",
  },
  {
    label: "All Jobs",
    key: navigations.ALL_JOBS,
    icon: "iconPostedJobs",
  },
];

const experiencedMembersMenu = [
  {
    label: "Dashboard",
    key: navigations.MODULE_LANDING_PAGE,
    icon: "iconDashboard",
  },
  {
    label: "Round 1 ",
    key: navigations.ROUND_ONE,
    icon: "iconRound1",
  },
];

export const moduleKeys = {
  NEWLY_QUALIFIED_PLACEMENTS_KEY: "nqca-placements",
  CA_JOBS_KEY: "ca-jobs",
  EXPERIENCED_MEMBERS_KEY: "experienced-members",
  CARRER_ASCENT_KEY: "career-ascents",
  WOMEN_PARTTIME_KEY: "women-placements",
  OVERSEAS_CHAPTERS_KEY: "overseas-chapters",
};

export const getAppModules = ({ isMember }) => {
  return [
    {
      label: "Newly Qualified Placements",
      key: moduleKeys.NEWLY_QUALIFIED_PLACEMENTS_KEY,
      children: newlyQualifiedPlacementsMenu,
      visible: false,
      image: images.iconNewlyQualified,
      isExperiencedMember: false,
    },
    {
      label: "CA Jobs",
      key: moduleKeys.CA_JOBS_KEY,
      children: isMember ? memberCaJobsMenu : caJobsMenu,
      visible: false,
      image: images.iconCAJobs,
      isExperiencedMember: false,
    },
    {
      label: "Experienced Members",
      key: moduleKeys.EXPERIENCED_MEMBERS_KEY,
      visible: false,
      sectionHeading: true,
    },
    {
      label: "Career Ascent",
      key: moduleKeys.CARRER_ASCENT_KEY,
      children: experiencedMembersMenu,
      visible: false,
      isSubMenu: true,
      image: images.iconCareerAscent,
      isExperiencedMember: true,
    },
    {
      label: "Women PartTime",
      key: moduleKeys.WOMEN_PARTTIME_KEY,
      children: experiencedMembersMenu,
      visible: false,
      isSubMenu: true,
      image: images.iconWomanPartTime,
      isExperiencedMember: true,
    },
    {
      label: "Overseas Chapters",
      key: moduleKeys.OVERSEAS_CHAPTERS_KEY,
      children: experiencedMembersMenu,
      visible: false,
      isSubMenu: true,
      image: images.iconOverseasChapters,
      isExperiencedMember: true,
    },
  ];
};

export const resetAllModules = (isMember) => {
  const modules = getAppModules({ isMember });
  modules.forEach((module) => {
    module.visible = false;
  });
};

export const getAccessibleModulesList = ({
  allModules = [],
  accessibleModules = [],
}) => {
  return allModules.map((item1) => {
    var itemInAccessibleModule = accessibleModules.find(
      (item2) => item2.toLowerCase() === item1?.key?.toLowerCase()
    );
    if (itemInAccessibleModule) {
      item1.visible = true;
    }
    if (
      item1.sectionHeading &&
      accessibleModules.find(
        (item) =>
          item === moduleKeys.CARRER_ASCENT_KEY ||
          item === moduleKeys.WOMEN_PARTTIME_KEY ||
          item === moduleKeys.OVERSEAS_CHAPTERS_KEY
      )
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
    iconAppliedJobs: {
      activeImage: images.iconAppliedJobsActiveJobs,
      webInactiveImage: images.iconAppliedJobs,
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
