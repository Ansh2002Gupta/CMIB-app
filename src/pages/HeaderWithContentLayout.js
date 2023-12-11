import React, { useContext, useState } from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import LoginHeaderContainer from "../containers/LoginHeader";
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
      header={
        !isWebView ? <LoginHeaderContainer onPress={toggleSideBar} /> : null
      }
      content={<Outlet />}
      sideBar={
        isWebView || isSideBarVisible ? (
          <SideNavBar onClose={() => setSideBarVisible(false)} items={items} />
        ) : null
      }
    />
  );
}

export default HeaderWithContentLayout;
