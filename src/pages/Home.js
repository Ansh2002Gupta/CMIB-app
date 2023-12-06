import React from "react";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";
import HeaderContainer from "../containers/Header";
import BottomBar from "../containers/BottomBar";

function Home() {
  return (
    <MainLayout
      header={<HeaderContainer />}
      menu={<BottomBar />}
      content={<Outlet />}
    />
  );
}

export default Home;
