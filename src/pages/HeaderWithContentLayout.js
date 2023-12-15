import React, { useEffect, useState } from "react";
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
  const isWebView = useIsWebView();

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
        (isWebView && isAuthenticated) || isSideBarVisible ? (
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
