import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PublicHeader from "../PublicHeader/PublicHeader";
import PrivateHeader from "../PrivateHeader/PrivateHeader";
import { getAuthToken } from "../../utils/getAuthToken";

const Header = ({ toggleSideBar, showCloseIcon, showHeader, menuIconVisible }) => {
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
      {showHeader ? (
        <>
          {isuserLoggedIn ? (
            <PrivateHeader
              toggleSideBar={toggleSideBar}
              showCloseIcon={showCloseIcon}
              menuIconVisible={menuIconVisible}
            />
          ) : (
            <PublicHeader />
          )}
        </>
      ) : null}
    </>
  );
};

Header.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.func.isRequired,
  showHeader: PropTypes.func.isRequired,
};

export default Header;
