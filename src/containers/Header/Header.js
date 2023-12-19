import React, { useEffect, useState } from "react";

import PublicHeader from "../PublicHeader/PublicHeader";
import PrivateHeader from "../PrivateHeader/PrivateHeader";
import { getAuthToken } from "../../utils/getAuthToken";

const Header = ({ onPress, showCloseIcon }) => {
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
      {isuserLoggedIn ? (
        <PrivateHeader onPress={onPress} showCloseIcon={showCloseIcon} />
      ) : (
        <PublicHeader />
      )}
    </>
  );
};

export default Header;
