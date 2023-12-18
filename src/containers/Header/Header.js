import React, { useEffect, useState } from "react";

import HeaderForLoggedInUser from "../../components/HeaderForLoggedInUser/HeaderForLoggedInUser";
import HeaderForNonLoggedInUser from "../../components/HeaderForNonLoggedInUser.js/HeaderForNonLoggedInUser";
import { getAuthToken } from "../../utils/getAuthToken";

const Header = ({ onPress }) => {
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
        <HeaderForLoggedInUser onPress={onPress} />
      ) : (
        <HeaderForNonLoggedInUser />
      )}
    </>
  );
};

export default Header;
