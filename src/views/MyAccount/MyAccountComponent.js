import React, { useState } from "react";
import PropTypes from "prop-types"; 

import { useIntl } from "react-intl";
import { useNavigate } from "../../routes";
import MyAccountUI from "./MyAccountUI";
import { options } from "./MyAccountConstant";
import { navigations } from "../../constants/routeNames";

const MyAccountComponent = ({ omitArrowIcon, setShowAccountSection }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleChangePassword = (val) => {
    setChangePasswordModal(val);
  };

  const handleLogout = (val) => {
    setLogout(val);
  };

  const saveLogout = () => {
    navigate(navigations.LOGIN);
  };

  const handleOptionClick = (option) => {
    //TODO: need to settle the position of the change pasword and logout modal code. will uncomment the below then
    // setShowAccountSection(false);
    if (option?.navigateTo) {
      navigate(option?.navigateTo);
      return;
    }
    
    switch (option.id) {
      //TODO: Add the screen handling once designs are available.
      case 6:
        handleChangePassword(true);
        break;
      case 7:
        handleLogout(true);
        break;
      default:
        break;
    }
  };

  return (
    <MyAccountUI
      changePasswordModal={changePasswordModal}
      handleOptionClick={handleOptionClick}
      handleChangePassword={handleChangePassword}
      handleLogoutClick={handleLogout}
      intl={intl}
      isLogout={logout}
      options={options}
      saveLogout={saveLogout}
      omitArrowIcon={omitArrowIcon}
    />
  );
};

MyAccountComponent.propTypes = {
  omitArrowIcon: PropTypes.bool,
  setShowAccountSection: PropTypes.func,
};

export default MyAccountComponent;
