import { navigations } from "../constants/routeNames";
import { SCREEN_NAMES } from "../constants/constants";

const ROUNDONE_APPLICATION_FORM = `${navigations.ROUND_ONE}/${navigations.APPLICATION_FORM}`;

export const getSmallScreenHeaderInfo = (path) => {
  switch (path) {
    case navigations.COMPANY_PROFILE: {
      return {
        text: SCREEN_NAMES.COMPANY_PROFILE,
        showBackButton: true,
        showRightButton: true,
      };
    }
    case navigations.VIEW_PROFILE: {
      return {
        text: SCREEN_NAMES.VIEW_PROFILE,
        showBackButton: true,
        showRightButton: false,
      };
    }
    case navigations.PROFILE: {
      return {
        text: SCREEN_NAMES.PROFILE,
        showBackButton: false,
        showRightButton: false,
      };
    }
    case navigations.ROUND_ONE: {
      return {
        text: SCREEN_NAMES.ROUND_ONE,
        showBackButton: false,
        showRightButton: false,
      };
    }
    case ROUNDONE_APPLICATION_FORM: {
      return {
        text: SCREEN_NAMES.ROUND_ONE_APPLICATION_FORM,
        showRightButton: true,
        showBackButton: true,
        actionIcontext: "Download",
      };
    }
    default: {
      return {
        text: "",
        showBackButton: false,
        showRightButton: false,
      };
    }
  }
};
