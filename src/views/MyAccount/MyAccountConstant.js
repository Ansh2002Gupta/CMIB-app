import { navigations } from "../../constants/routeNames";
import images from "../../images";

export const options = [
  {
    title: "label.view_profile",
    id: 1,
    iconLeft: images.iconProfile,
    navigateTo: navigations.VIEW_PROFILE,
  },
  {
    title: "label.tickets",
    id: 2,
    iconLeft: images.ticketIcon,
    navigateTo: '',
  },
  {
    title: "label.feedback",
    id: 3,
    iconLeft: images.iconSend,
    navigateTo: "",
  },
  {
    title: "label.notification_settings",
    id: 4,
    iconLeft: images.iconSetting,
    navigateTo: "",
  },
  {
    title: "label.company_profile",
    id: 5,
    iconLeft: images.iconBuilding,
    navigateTo: navigations.COMPANY_PROFILE,
  },
  {
    title: "label.change_password",
    id: 6,
    iconLeft: images.iconLock,
    navigateTo: "",
  },
  {
    title: "label.logout",
    id: 7,
    iconLeft: images.iconLogout,
    navigateTo: "",
  },
];
