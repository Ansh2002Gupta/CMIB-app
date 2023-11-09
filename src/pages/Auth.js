import React from 'react';

import {Outlet} from '../routes';

import AuthLayout from '../layouts/AuthLayout';

function Auth() {
  return <AuthLayout content={<Outlet />} />;
}

export default Auth;
