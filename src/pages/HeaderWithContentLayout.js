import React, { useContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "../routes";
import { useLocation } from "react-router-dom";
import {
  Modal,
  Platform,
  ScrollView,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { MediaQueryContext } from "@unthinkable/react-theme";

import MainLayout from "../layouts/MainLayout";

import BottomBar from "../containers/BottomBar";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import { getAuthToken } from "../utils/getAuthToken";
import useIsWebView from "../hooks/useIsWebView";
import { navigations } from "../constants/routeNames";
import commonStyles from "../theme/styles/commonStyles";
import Styles from "./HeaderWithContentLayout.style";

function HeaderWithContentLayout() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

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

  const { isWebView } = useIsWebView();
  const windowDimensions = useWindowDimensions();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const modalSideBar = isSideBarVisible && !(windowDimensions.width >= 900);
  const isMdOrGreater = useMemo(
    () => windowDimensions.width >= 900,
    [windowDimensions.width]
  );

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  const showBottomBar = () => {
    const routeName = location.pathname;
    const includedRoutes = [
      navigations.DASHBOARD,
      navigations.ROUND_ONE,
      navigations.ROUND_TWO,
      navigations.PROFILE,
    ];

    return includedRoutes.includes(routeName);
  };

  // Components for rendering the sidebar in a modal or inline
  const sidebarComponent = (
    <SideNavBar onClose={toggleSideBar} showCloseIcon={modalSideBar} />
  );

  return (
    <>
      {modalSideBar && (
        <Modal
          isVisible={modalSideBar}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={Styles().modalStyle}
        >
          {Platform.OS.toLowerCase() === "web" ? (
            <ScrollView style={Styles().sideBarSection}>
              {sidebarComponent}
            </ScrollView>
          ) : (
            sidebarComponent
          )}
        </Modal>
      )}

      <MainLayout
        header={<Header onPressLeftIcon={toggleSideBar} />}
        bottomSection={
          isAuthenticated &&
          (!isWebView && showBottomBar() ? <BottomBar /> : null)
        }
        menu={isAuthenticated ? sidebarComponent : null}
        content={<Outlet />}
        footer={!isAuthenticated && isWebView && <Footer />}
        topSectionStyle={isMdOrGreater && commonStyles.headerContainer}
        isRightFillSpace={false}
        isLeftFillSpace={false}
        rightSectionStyle={Styles(currentBreakpoint).rightSectionStyle}
        leftSectionStyle={Styles(currentBreakpoint).leftSectionStyle}
        bottomSectionStyle={
          isMdOrGreater ? Styles().bottomSectionStyle : Styles().bottomBar
        }
      />
    </>
  );
}

export default HeaderWithContentLayout;
