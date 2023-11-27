import React from "react";
import { Outlet } from "../routes";
import MainLayout from "../layouts/MainLayout";
import LoginHeaderContainer from "../containers/LoginHeader";

function Login() {
  return <MainLayout header={<LoginHeaderContainer />} content={<Outlet />} />;
}

export default Login;
