import React, { useContext } from "react";
import { useNavigate } from "../../routes";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import MyAccountUI from "./MyAccountUI";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  setShowChangePasswordModal,
  setShowLogoutModal,
} from "../../globalContext/userProfile/userProfileActions";
import { options } from "./MyAccountConstant";

const MyAccountComponent = ({ omitArrowIcon, setShowAccountSection }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [userProfileDetails, userProfileDispatch] =
    useContext(UserProfileContext);

  const handleOptionClick = (option) => {
    setShowAccountSection && setShowAccountSection(false);
    if (option?.navigateTo) {
      navigate(option?.navigateTo);
      return;
    }
    switch (option.id) {
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
      userProfileDetails={userProfileDetails?.userDetails}
    />
  );
};

MyAccountComponent.defaultProps = {
  omitArrowIcon: false,
  setShowAccountSection: () => {},
};

MyAccountComponent.propTypes = {
  omitArrowIcon: PropTypes.bool,
  setShowAccountSection: PropTypes.func,
};

export default MyAccountComponent;
