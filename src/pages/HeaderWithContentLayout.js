import React from "react";

import Footer from "../containers/Footer/Footer";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import Header from "../containers/Header";
import commonStyles from "../theme/styles/commonStyles";
import useIsWebView from "../hooks/useIsWebView";

function HeaderWithContentLayout() {
  const { isWebView } = useIsWebView();
  return (
    <MainLayout
      header={<Header />}
      content={<Outlet />}
      topSectionStyle={commonStyles.headerContainer}
      menu={isWebView ? <Footer /> : null}
    />
  );
}

export default HeaderWithContentLayout;
