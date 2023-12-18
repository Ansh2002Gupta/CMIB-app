import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";

import { getAuthToken } from "../utils/getAuthToken";
import useIsWebView from "../hooks/useIsWebView";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import Header from "../containers/Header";
import {
  items,
  newQualifiedPlacementsList,
} from "../constants/sideBarListItems";
import commonStyles from "../theme/styles/commonStyles";

function HeaderWithContentLayout() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [listItems, setListItems] = useState(items);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isWebView } = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const windowDimensions = useWindowDimensions();

  const handleNewlyQualifiedPlacementsClick = () => {
    setListItems(newQualifiedPlacementsList);
  };

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
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

  const layoutProps = {};

  if (
    isWebView &&
    isAuthenticated &&
    currentBreakpoint !== "sm" &&
    currentBreakpoint !== "xs"
  ) {
    layoutProps.isRightFillSpace = false;
    layoutProps.leftSectionStyle = {
      flex:
        currentBreakpoint === "md"
          ? 2
          : windowDimensions.width >= 1200 && windowDimensions.width <= 1400
          ? 1.5
          : 1,
    };

    layoutProps.rightSectionStyle = { flex: 4 };
  }
  return (
    <MainLayout
      header={<Header onPress={toggleSideBar} />}
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
      {...layoutProps}
      menu={
        (isWebView &&
          isAuthenticated &&
          currentBreakpoint !== "sm" &&
          currentBreakpoint !== "xs") ||
        isSideBarVisible ? (
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
