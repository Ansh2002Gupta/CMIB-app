import React from "react";
import { Outlet } from "../routes";

import MainLayout from "../layouts/MainLayout";
import Header from "../containers/Header";
import MenuContainer from "../containers/Menu";

function Home() {
  return (
    <MainLayout
      header={<Header />}
      menu={<MenuContainer />}
      content={<Outlet />}
    />
  );
}

export default Home;
