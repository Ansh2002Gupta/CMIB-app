import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PublicHeader from "../PublicHeader/PublicHeader";
import PrivateHeader from "../PrivateHeader/PrivateHeader";
import { getAuthToken } from "../../utils/getAuthToken";
import images from "../../images";

const Header = ({ onPressLeftIcon, onPressRightIcon, leftIcon, rightIcon }) => {
  const [isuserLoggedIn, setIsuserLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const authToken = await getAuthToken();
      if (authToken) {
        setIsuserLoggedIn(true);
      } else {
        setIsuserLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching authToken:", error);
    }
  };

  return (
    <>
      {isuserLoggedIn ? (
        <PrivateHeader
          {...{ onPressLeftIcon, onPressRightIcon, leftIcon, rightIcon }}
        />
      ) : (
        <PublicHeader />
      )}
    </>
  );
};

Header.defaultProps = {
  onPressLeftIcon: () => {},
  onPressRightIcon: () => {},
  leftIcon : images.iconMenu,
  rightIcon :images.iconNotification,
};

Header.propTypes = {
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
};

export default Header;
