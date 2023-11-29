import React from "react";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";
import HeaderContainer from "../containers/Header";
import MenuContainer from "../containers/Menu";

function Home() {
  return (
    <MainLayout
      header={<HeaderContainer />}
      menu={<MenuContainer />}
      content={<Outlet />}
    />
  );
}

export default Home;
