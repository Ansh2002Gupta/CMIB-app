import React, { useContext } from "react";
import { Outlet } from "../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";

import BottomBar from "../containers/BottomBar";
import HeaderContainer from "../containers/Header";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <MainLayout
      header={<HeaderContainer />}
      menu={<BottomBar />}
      content={<Outlet />}
    />
  );
}

export default Home;
