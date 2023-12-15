import React from "react";
import { Outlet } from "../routes";

import BottomBar from "../containers/BottomBar";
import MainLayout from "../layouts/MainLayout";
import useIsWebView from "../hooks/useIsWebView";

function Home() {
  const { isWebView } = useIsWebView();
  return (
    <MainLayout
      menu={!isWebView ? <BottomBar /> : <BottomBar />}
      content={<Outlet />}
    />
  );
}

export default Home;
