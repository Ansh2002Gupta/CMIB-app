import React, { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "../routes";
import { Platform, ScrollView } from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { MediaQueryContext } from "@unthinkable/react-theme";

import MainLayout from "../layouts/MainLayout";

import BottomBar from "../containers/BottomBar";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import SidebarModal from "../components/SideBarModal";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import useIsWebView from "../hooks/useIsWebView";
import { navigations } from "../constants/routeNames";
import { getAuthToken } from "../utils/getAuthToken";
import images from "../images";
import commonStyles from "../theme/styles/commonStyles";
import styles from "./HeaderWithContentLayout.style";
import { doesPathIncludeAnyKey } from "../utils/util";

function HeaderWithContentLayout({ doesExcludeHeader }) {
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

  // Components for rendering the sidebar in a modal or inline
  const sidebarComponent = (
    <SideNavBar onClose={toggleSideBar} showCloseIcon={modalSideBar} />
  );

  return (
    <>
      {modalSideBar && (
        <SidebarModal
          isVisible={modalSideBar}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          style={styles().modalStyle}
        >
          {Platform.OS.toLowerCase() === "web" ? (
            <ScrollView style={styles().sideBarSection}>
              {sidebarComponent}
            </ScrollView>
          ) : (
            sidebarComponent
          )}
        </SidebarModal>
      )}
      <MainLayout
        header={
          (doesExcludeHeader || doesPathIncludeAnyKey(location?.pathname)) &&
          !isWebView ? null : (
            <Header
              onPressLeftIcon={toggleSideBar}
              leftIcon={images.iconMenu}
              rightIcon={images.iconNotification}
            />
          )
        }
        bottomSection={
          // TODO : check user type and route as application form
          isAuthenticated &&
          !location.pathname.includes(navigations.APPLICATION_FORM) &&
          (!isWebView &&
          !doesExcludeHeader &&
          !doesPathIncludeAnyKey(location?.pathname) ? (
            <BottomBar />
          ) : null)
        }
        menu={isAuthenticated ? sidebarComponent : null}
        content={<Outlet />}
        footer={!isAuthenticated && isWebView && <Footer />}
        topSectionStyle={isMdOrGreater && commonStyles.headerContainer}
        isRightFillSpace={false}
        isLeftFillSpace={false}
        rightSectionStyle={
          styles(currentBreakpoint, isAuthenticated).rightSectionStyle
        }
        leftSectionStyle={
          styles(currentBreakpoint, isAuthenticated).leftSectionStyle
        }
        bottomSectionStyle={
          isMdOrGreater ? styles().bottomSectionStyle : styles().bottomBar
        }
      />
    </>
  );
}

export default HeaderWithContentLayout;
