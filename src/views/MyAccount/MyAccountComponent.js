import React, {useState} from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import MyAccountUI from "./MyAccountUI";
import { options } from "./MyAccountConstant";
import { navigations } from "../../constants/routeNames";

const MyAccountComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [Logout, setLogout] = useState(false);

  const onClickViewProfile = () => {
    navigate(navigations.VIEW_PROFILE);
  };

  const onClickCompanyProfile = () => {
    navigate(navigations.COMPANY_PROFILE);
  };

  const handleLogout = (val) => {
    setLogout(val);
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
      intl={intl}
      isLogout={Logout}
      options={options}
      handleOptionClick={handleOptionClick}
      handleLogoutClick={handleLogout}
      
    />
  );
};

export default MyAccountComponent;
