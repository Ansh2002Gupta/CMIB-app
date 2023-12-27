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

export const newQualifiedPlacementsList = [
  // TODO data will replace with API data
  {
    id: 0,
    title: "Newly Qualified Placements",
  },
  {
    id: 1,
    title: "CA Jobs",
  },
  {
    id: 2,
    title: "Experienced Members",
    subitems: [
      {
        id: 3,
        title: "Career Ascent",
      },
      {
        id: 4,
        title: "Women Part Time",
      },
      {
        id: 5,
        title: "Overseas Chapters",
      },
    ],
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



// TODO: need to add icons according to menu
const controlMenu = [
  { label: "Users", key: "users", icon: '' },
  { label: "Notifications", key: "notifications", icon: '' },
  { label: "Contact Us", key: "contact-us", icon: '' },
  { label: "Session", key: "session", icon: '' },
  { label: "Feedback", key: "feedback", icon: '' },
  { label: "Testimonials", key: "testimonials", icon: '' },
  {
    label: "Registered Companies",
    key: "register-companies",
    icon: '',
  },
  { label: "Activity Logs", key: "activity-logs", icon: '' },
];
const newlyQualifiedPlacementsMenu = [
  { label: "Dashboard", key: "dashboard", icon: 'iconDashboard' },
  {
    label: "Round 1 Placements",
    key: "round-1-placements",
    icon: 'iconRound1',
  },
  {
    label: "Round 1 Placements",
    key: "round-2-placements",
    icon: 'iconRound2',
  },
];
const caJobsMenu = [
  { label: "Dashboard", key: "dashboard", icon: '' },
  { label: "Subscriptions", key: "subscriptions", icon: '' },
  {
    label: "Global Configurations",
    key: "global-configurations",
    icon: '',
  },
  { label: "Payments", key: "payments", icon: '' },
  { label: "Candidates", key: "candidates", icon: '' },
  { label: "Companies", key: "companies", icon: '' },
  { label: "All Jobs", key: "all-jobs", icon: '' },
  { label: "Report", key: "report", icon: '' },
];
const experiencedMembersMenu = [
  { label: "Dashboard", key: "dashboard", icon: '' },
  { label: "Payments", key: "payments", icon: '' },
  { label: "Candidates", key: "candidates", icon: '' },
  { label: "Companies", key: "companies", icon: '' },
  {
    label: "Global Configurations",
    key: "global-configurations",
    icon: '',
  },
  { label: "Session", key: "session", icon: '' },
  { label: "Roster", key: "roster", icon: '' },
  { label: "Report", key: "report", icon: '' },
];
// TODO: need to add role based menu
export const modules = [
  // {
  //   label: "Control",
  //   key: "control",
  //   children: controlMenu,
  // },
  {
    label: "Newly Qualified Placements",
    key: "newly-qualified-placements",
    children: newlyQualifiedPlacementsMenu,
  },
  {
    label: "CA Jobs",
    key: "ca-jobs",
    children: caJobsMenu,
  },
  {
    label: "Experienced Members",
    key: "experienced-members",
    subMenu: [
      {
        key: "career-ascent",
        label: "Career Ascent",
        children: experiencedMembersMenu,
      },
      {
        key: "women-part-time",
        label: "Women PartTime",
        children: experiencedMembersMenu,
      },
      {
        key: "overseas-chapters",
        label: "Overseas Chapters",
        children: experiencedMembersMenu,
      },
    ],
  },

  // Add more modules as needed
];


