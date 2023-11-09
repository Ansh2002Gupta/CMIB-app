import React from 'react';

import DashboardView from '../views/Dashboard';
import ProfileView from '../views/Profile';
import LoginForm from '../views/LoginForm';
import Home from '../pages/Home';
import Auth from '../pages/Auth';

import withPrivateAccess from '../hocs/withPrivateAccess';
import withPublicAccess from '../hocs/withPublicAccess';

const AuthWithPublicAccess = withPublicAccess(Auth);
const HomeWithPrivateAccess = withPrivateAccess(Home);

const config = [
  {
    pagePath: '/example',
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: 'route',
        element: <div>Example Route</div>,
      },
      {
        viewPath: 'route1',
        element: <div>Example Route1</div>,
      },
    ],
  },
  {
    pagePath: '/',
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: '',
        element: <DashboardView />, // view
      },
    ],
  },
  {
    pagePath: '/profile',
    element: <HomeWithPrivateAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: '',
        element: <ProfileView />, // view
      },
    ],
  },
  {
    pagePath: '/login',
    element: <AuthWithPublicAccess />, // Page
    views: [
      // array of views under Page route
      {
        viewPath: '',
        element: <LoginForm />, // view
      },
    ],
  },
];

export default config;
