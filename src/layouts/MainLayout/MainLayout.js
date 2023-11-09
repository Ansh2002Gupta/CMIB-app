import React, {useContext} from 'react';
import {MediaQueryContext, useComponentTheme} from '@unthinkable/react-theme';

import {TwoColumn, TwoRow} from '../../core/layouts';

function MainLayout({header, menu, content}) {
  const theme = useComponentTheme('Auth');

  const {current: currentBreakpoint} = useContext(MediaQueryContext);

  let layout = (
    <TwoRow
    style={theme.mainContainerStyle}
      topSection={
        <TwoRow
          topSection={header}
          bottomSection={content}
          isBottomFillSpace={true}
        />
      }
      bottomSection={menu}
      isTopFillSpace={true}
      isBottomFillSpace={false}
    />
  );

  if (currentBreakpoint === 'md') {
    layout = (
      <TwoColumn
      style={theme.mainContainerStyle}
        leftSection={menu}
        rightSection={
          <TwoRow
            topSection={header}
            bottomSection={content}
            isBottomFillSpace={true}
          />
        }
        isLeftFillSpace={false}
        isRightFillSpace={true}
      />
    );
  }
  
  return layout;
}

export default MainLayout;
