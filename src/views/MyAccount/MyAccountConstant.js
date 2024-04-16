import { navigations } from "../../constants/routeNames";
import images from "../../images";

export const options = [
  {
    title: "label.view_profile",
    id: 1,
    iconLeft: images.iconProfile,
    isCandidate: true,
    isCompany: true,
    preventWebNavigation: true,
    navigateTo: navigations.VIEW_PROFILE,
  },
  {
    title: "label.tickets",
    id: 2,
    iconLeft: images.ticketIcon,
    isCandidate: true,
    isCompany: true,
    navigateTo: navigations.TICKETS,
  },
  {
    title: "label.feedback",
    id: 3,
    iconLeft: images.iconSend,
    isCandidate: true,
    isCompany: true,
    navigateTo: navigations.FEEDBACK,
  },
  {
    title: "label.notification_settings",
    id: 4,
    iconLeft: images.iconSetting,
  },
  {
    title: "label.company_profile",
    id: 5,
    iconLeft: images.iconBuilding,
    isCandidate: false,
    isCompany: true,
    navigateTo: navigations.COMPANY_PROFILE,
  },
  {
    title: "label.job_profile",
    id: 8,
    iconLeft: images.iconBuilding,
    isCandidate: true,
    isCompany: false,
    navigateTo: navigations.JOB_PROFILE,
  },
  {
    title: "label.change_password",
    id: 6,
    iconLeft: images.iconLock,
    isCandidate: false,
    isCompany: true,
    showModal: true,
  },
  {
    title: "label.logout",
    id: 7,
    iconLeft: images.iconLogout,
    isCandidate: true,
    isCompany: true,
    showModal: true,
  },
];
