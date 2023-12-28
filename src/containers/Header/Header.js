import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PublicHeader from "../PublicHeader/PublicHeader";
import PrivateHeader from "../PrivateHeader/PrivateHeader";
import { getAuthToken } from "../../utils/getAuthToken";

const Header = ({ onPressLeftIcon, onPressRightIcon }) => {
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
          onPressLeftIcon={onPressLeftIcon}
          onPressRightIcon={onPressRightIcon}
        />
      ) : (
        <PublicHeader />
      )}
    </>
  );
};

Header.propTypes = {
  onPressLeftIcon: PropTypes.func.isRequired,
  onPressRightIcon: PropTypes.func.isRequired,
};

export default Header;
