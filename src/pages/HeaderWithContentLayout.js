import React, { useContext } from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import LoginHeaderContainer from "../containers/LoginHeader";
import { MediaQueryContext } from "@unthinkable/react-theme";

function HeaderWithContentLayout() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <MainLayout
      header={<LoginHeaderContainer />}
      content={<Outlet />}
      topSectionStyle={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: "white"}}
    />
  );
}

export default HeaderWithContentLayout;
