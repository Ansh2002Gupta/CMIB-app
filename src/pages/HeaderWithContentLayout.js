import React, { useContext } from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import LoginHeaderContainer from "../containers/LoginHeader";
import { MediaQueryContext } from "@unthinkable/react-theme";

function HeaderWithContentLayout() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView =
    currentBreakpoint === "sm" ||
    currentBreakpoint === "md" ||
    currentBreakpoint === "lg" ||
    currentBreakpoint === "xl" ||
    currentBreakpoint === "xxl";

  return (
    <MainLayout
      header={!isWebView ? <LoginHeaderContainer /> : null}
      content={<Outlet />}
    />
  );
}

export default HeaderWithContentLayout;
