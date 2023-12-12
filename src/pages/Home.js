import React from "react";
import { Outlet } from "../routes";

import BottomBar from "../containers/BottomBar";
import MainLayout from "../layouts/MainLayout";
import useIsWebView from "../utils/isWebView";

function Home() {
  const isWebView = useIsWebView();

  return (
    <MainLayout menu={!isWebView ? <BottomBar /> : null} content={<Outlet />} />
  );
}

export default Home;
