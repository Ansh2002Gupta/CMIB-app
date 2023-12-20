import React, { useContext, useEffect, useState } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";

import { getAuthToken } from "../utils/getAuthToken";
import useIsWebView from "../hooks/useIsWebView";
import Header from "../containers/Header";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import {
  items,
  newQualifiedPlacementsList,
} from "../constants/sideBarListItems";
import commonStyles from "../theme/styles/commonStyles";

function HeaderWithContentLayout() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listItems, setListItems] = useState(items);
  const [showClose, setShowClose] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

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

  const showCloseIcon = () => {
    setShowClose(true);
  };
  const handleDisplayHeader = () => {
    setShowHeader(false);
  };

  return (
    <MainLayout
      header={
        <Header
          onPress={toggleSideBar}
          showCloseIcon={showCloseIcon}
          showHeader={showHeader}
        />
      }
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
      leftSectionStyle={
        (isWebView &&
          isAuthenticated &&
          currentBreakpoint !== "sm" &&
          currentBreakpoint !== "xs") ||
        isSideBarVisible
          ? {
              flex:
                currentBreakpoint === "md"
                  ? 2
                  : windowDimensions.width >= 1200 &&
                    windowDimensions.width <= 1400
                  ? 1.5
                  : currentBreakpoint === "xs"
                  ? 0
                  : 1,
            }
          : {}
      }
      isRightFillSpace={false}
      rightSectionStyle={{ flex: 4 }}
      menu={
        (isWebView &&
          isAuthenticated &&
          currentBreakpoint !== "sm" &&
          currentBreakpoint !== "xs") ||
        isSideBarVisible ? (
          <SideNavBar
            handleDisplayHeader={handleDisplayHeader}
            onClose={() => {
              setSideBarVisible(false);
            }}
            onPress={handleNewlyQualifiedPlacementsClick}
            resetList={() => setListItems(items)}
            showCloseIcon={showClose}
            items={listItems}
          />
        ) : null
      }
    />
  );
}

export default HeaderWithContentLayout;
