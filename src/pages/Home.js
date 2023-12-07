import React, { useContext } from "react";
import { Outlet } from "../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";

import MainLayout from "../layouts/MainLayout";
import HeaderContainer from "../containers/Header";
import BottomBar from "../containers/BottomBar";

function Home() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <MainLayout
      header={<HeaderContainer />}
      menu={!isWebView ? <BottomBar /> : null}
      content={<Outlet />}
    />
  );
}

export default Home;
