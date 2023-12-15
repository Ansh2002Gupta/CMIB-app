import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import MyAccountUI from "./MyAccountUI";
import { options } from "./MyAccountConstant";
import { navigations } from "../../constants/routeNames";

const MyAccountComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const onClickViewProfile = () => {
    navigate(navigations.VIEW_PROFILE);
  };

  const onClickCompanyProfile = () => {
    navigate(navigations.COMPANY_PROFILE);
  };

  const handleChangePassword = (val) => {
    setChangePasswordModal(val);
  };

  const handleOptionClick = (option) => {
    switch (option.id) {
      case 1:
        onClickViewProfile();
        break;
      //TODO: Add the screen handling once designs are available.
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        onClickCompanyProfile();
        break;
      case 6:
        handleChangePassword(true);
        break;
      case 7:
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
      intl={intl}
      options={options}
    />
  );
};

export default MyAccountComponent;
