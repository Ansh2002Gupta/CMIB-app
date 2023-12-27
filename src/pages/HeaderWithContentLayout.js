import React from "react";
import { Outlet } from "../routes";

import Footer from "../containers/Footer";
import Header from "../containers/Header";
import MainLayout from "../layouts/MainLayout";
import useIsWebView from "../hooks/useIsWebView";
import commonStyles from "../theme/styles/commonStyles";

function HeaderWithContentLayout() {
  const { isWebView } = useIsWebView();

  return (
    <MainLayout
      header={<Header />}
      content={<Outlet />}
      bottomSectionStyle={commonStyles.contentContainer}
      topSectionStyle={commonStyles.headerContainer}
      menu={isWebView ? <Footer /> : null}
    />
  );
}

export default HeaderWithContentLayout;
