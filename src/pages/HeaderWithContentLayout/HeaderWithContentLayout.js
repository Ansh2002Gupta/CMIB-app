import React from "react";

import { Outlet } from "../../routes";
import MainLayout from "../../layouts/MainLayout";
import CommonHeader from "../../containers/CommonHeader";
import style from "./HeaderWithContent.style"

function HeaderWithContentLayout() {
  return (
    <MainLayout
      header={<CommonHeader />}
      content={<Outlet />}
      topSectionStyle={style.headerContainer}
    />
  );
}

export default HeaderWithContentLayout;
