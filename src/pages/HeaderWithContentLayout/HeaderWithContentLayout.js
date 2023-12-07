import React from "react";

import { Outlet } from "../../routes";
import MainLayout from "../../layouts/MainLayout";
import Header from "../../containers/Header";
import style from "./HeaderWithContent.style"

function HeaderWithContentLayout() {
  return (
    <MainLayout
      header={<Header />}
      content={<Outlet />}
      topSectionStyle={style.headerContainer}
    />
  );
}

export default HeaderWithContentLayout;
