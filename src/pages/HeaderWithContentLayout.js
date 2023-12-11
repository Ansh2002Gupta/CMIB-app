import React from "react";

import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import Header from "../containers/Header";
import commonStyles from "../theme/styles/commonStyles";

function HeaderWithContentLayout() {
  return (
    <MainLayout
      header={<Header />}
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
    />
  );
}

export default HeaderWithContentLayout;
