import React, { useEffect, useState, useMemo, useContext } from "react";

import {
  Modal,
  Platform,
  ScrollView,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import { MediaQueryContext } from "@unthinkable/react-theme";

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
import Styles from "./HeaderWithContentLayout.style";
import BottomBar from "../containers/BottomBar";

function HeaderWithContentLayout() {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuIconVisible, setMenuIconVisible] = useState(true);
  const [listItems, setListItems] = useState(items);
  const [showClose, setShowClose] = useState(false);

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

  useEffect(() => {
    if (isSideBarVisible) {
      setMenuIconVisible(false);
    } else {
      setMenuIconVisible(true);
      setShowClose(false);
    }
  }, [isSideBarVisible]);

  const { isWebView } = useIsWebView();
  const windowDimensions = useWindowDimensions();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const modalSideBar = isSideBarVisible && !(windowDimensions.width >= 900);
  const isMdOrGreater = useMemo(
    () => windowDimensions.width >= 900,
    [windowDimensions.width]
  );

  const handleNewlyQualifiedPlacementsClick = () => {
    setListItems(newQualifiedPlacementsList);
  };

  const toggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
    showCloseIcon();
  };

  const showCloseIcon = () => {
    setShowClose(true);
  };

  // Components for rendering the sidebar in a modal or inline
  const sidebarComponent = (
    <SideNavBar
      onClose={() => setSideBarVisible(false)}
      onPress={handleNewlyQualifiedPlacementsClick}
      resetList={() => setListItems(items)}
      showCloseIcon={modalSideBar}
      items={listItems}
    />
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
          {Platform.OS.toLocaleLowerCase() === "web" ? (
            <ScrollView style={{ flex: 1 }}>{sidebarComponent}</ScrollView>
          ) : (
            sidebarComponent
          )}
        </Modal>
      )}

      <MainLayout
        header={
          <Header
            toggleSideBar={toggleSideBar}
            showCloseIcon={showCloseIcon}
            menuIconVisible={menuIconVisible}
          />
        }
        bottomSection={!isWebView ? <BottomBar /> : null}
        menu={isAuthenticated ? sidebarComponent : null}
        content={<Outlet />}
        isSideBarVisible={isSideBarVisible}
        topSectionStyle={
          isMdOrGreater
            ? commonStyles.topSectionStyle
            : commonStyles.headerContainer
        }
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
