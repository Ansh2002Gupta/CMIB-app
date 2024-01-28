import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import MyAccountUI from "./MyAccountUI";
import useIsWebView from "../../hooks/useIsWebView";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
  setShowViewProfileModal,
} from "../../globalContext/userProfile/userProfileActions";
import { options } from "./MyAccountConstant";

const MyAccountComponent = ({ omitArrowIcon, setShowAccountSection }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { isWebView } = useIsWebView();
  const [, userProfileDispatch] = useContext(UserProfileContext);

  const handleOptionClick = (option) => {
    setShowAccountSection && setShowAccountSection(false);
    const shouldNavigate = isWebView
      ? !option?.preventWebNavigation
      : !!option?.preventWebNavigation;
    if (option?.navigateTo && shouldNavigate) {
      navigate(option?.navigateTo);
      return;
    }

    switch (option.id) {
      case 1:
        userProfileDispatch(setShowViewProfileModal(true));
        break;
      case 6:
        userProfileDispatch(setShowChangePasswordModal(true));
        break;
      case 7:
        userProfileDispatch(setShowLogoutModal(true));
        break;
      default:
        break;
    }
  };

  return (
    <MyAccountUI
      handleOptionClick={handleOptionClick}
      intl={intl}
      options={options}
      omitArrowIcon={omitArrowIcon}
    />
  );
};

MyAccountComponent.propTypes = {
  omitArrowIcon: PropTypes.bool,
  setShowAccountSection: PropTypes.func,
};

export default MyAccountComponent;
