import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";

import { getAuthToken } from "../utils/getAuthToken";
import {
  items,
  newQualifiedPlacementsList,
} from "../constants/ConstantListItems";
import commonStyles from "../theme/styles/commonStyles";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import Header from "../containers/Header";

function HeaderWithContentLayout() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [listItems, setListItems] = useState(items);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNewlyQualifiedPlacementsClick = () => {
    setListItems(newQualifiedPlacementsList);
  };

  const toggleSideBar = () => {
    if (!isWebView) {
      setSideBarVisible(!isSideBarVisible);
    }
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const authToken = await getAuthToken();
        if (authToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching authToken:", error);
      }
    };
    checkAuthToken();
  }, []);

  return (
    <MainLayout
      header={!isWebView ? <Header onPress={toggleSideBar} /> : null}
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
      menu={
        isWebView || (isSideBarVisible && isAuthenticated) ? (
          <SideNavBar
            onClose={() => setSideBarVisible(false)}
            items={listItems}
            onPress={handleNewlyQualifiedPlacementsClick}
          />
        ) : null
      }
    />
  );
}

export default HeaderWithContentLayout;
