import React, { useContext, useState } from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import Header from "../containers/Header";
import commonStyles from "../theme/styles/commonStyles";
import SideNavBar from "../containers/SideNavBar/SideNavBar";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { items } from "../constants/ConstantListItems";

function HeaderWithContentLayout() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const isWebView = currentBreakpoint !== "xs";
  const [isSideBarVisible, setSideBarVisible] = useState(false);

  const toggleSideBar = () => {
    if (!isWebView) {
      setSideBarVisible(!isSideBarVisible);
    }
  };

  return (
    <MainLayout
      header={!isWebView ? <Header onPress={toggleSideBar} /> : null}
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
      menu={
        isWebView &&
        currentBreakpoint !== "sm" &&
        currentBreakpoint !== "xs" ? (
          <SideNavBar onClose={() => setSideBarVisible(false)} items={items} />
        ) : null
      }
    />
  );
}

export default HeaderWithContentLayout;
