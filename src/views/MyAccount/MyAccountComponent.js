import React from "react";
import { useIntl } from "react-intl";
import images from "../../images";
import { useNavigate } from "../../routes";
import MyAccountUI from "./MyAccountUI";

const MyAccountComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const options = [
    { title: "View Profile", id: 1, iconLeft: images.iconProfile },
    { title: "Comapny Profile", id: 2, iconLeft: images.iconBuilding },
    { title: "Change Password", id: 3, iconLeft: images.iconLock },
    { title: "Logout", id: 4, iconLeft: images.iconLogout },
  ];

  const onClickViewPorfile = () => {
    navigate("/viewprofile");
  };

  const onClickCompanyPorfile = () => {
    navigate("/companyProfile");
  };

  const handleOptionClick = (option) => {
    switch (option.id) {
      case 1:
        onClickViewPorfile();
        break;
      case 2:
        onClickCompanyPorfile();
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  };

  return (
    <MyAccountUI
      intl={intl}
      options={options}
      handleOptionClick={handleOptionClick}
    />
  );
};

export default MyAccountComponent;
