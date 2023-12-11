import React, { useContext } from "react";
import { Outlet } from "../routes";
import { MediaQueryContext } from "@unthinkable/react-theme";

import BottomBar from "../containers/BottomBar";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";

  return (
    <MainLayout menu={!isWebView ? <BottomBar /> : null} content={<Outlet />} />
  );
}

export default Home;
