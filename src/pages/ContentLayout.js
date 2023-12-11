import React from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";

function ContentLayout() {
  return <MainLayout content={<Outlet />} />;
}

export default ContentLayout;
