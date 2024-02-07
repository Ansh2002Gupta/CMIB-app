import React from 'react';
import {useComponentTheme} from '@unthinkable/react-theme';

import {Base as BaseLayout} from '../../core/layouts';

function AuthLayout({content}) {
  const theme = useComponentTheme('Auth');

  return <BaseLayout style={theme.mainContainerStyle}>{content}</BaseLayout>;
}

AuthLayout.defaultProps = {};

export default AuthLayout;
