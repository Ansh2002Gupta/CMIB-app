import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PublicHeader from "../PublicHeader/PublicHeader";
import PrivateHeader from "../PrivateHeader/PrivateHeader";
import { getAuthToken } from "../../utils/getAuthToken";

const Header = ({ onPress, showCloseIcon, showHeader }) => {
  const [isuserLoggedIn, setIsuserLoggedIn] = useState(false);

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

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <>
      {showHeader ? (
        <>
          {isuserLoggedIn ? (
            <PrivateHeader onPress={onPress} showCloseIcon={showCloseIcon} />
          ) : (
            <PublicHeader />
          )}
        </>
      ) : null}
    </>
  );
};

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.func.isRequired,
  showHeader: PropTypes.func.isRequired,
};

export default Header;
