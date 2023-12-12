import React, { useContext } from "react";
import { MediaQueryContext, useComponentTheme } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

function MainLayout({ header, menu, content, topSectionStyle }) {
  const theme = useComponentTheme("Auth");

  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  let layout = (
    <TwoRow
      style={theme.mainContainerStyle}
      topSection={
        <TwoRow
          topSection={header}
          bottomSection={content}
          isBottomFillSpace={true}
          topSectionStyle={topSectionStyle}
        />
      }
      bottomSection={menu}
      isTopFillSpace={true}
      isBottomFillSpace={false}
    />
  );

  layout = (
    <TwoColumn
      style={theme.mainContainerStyle}
      leftSection={menu}
      rightSection={
        <TwoRow
          topSection={header}
          bottomSection={content}
          isBottomFillSpace={true}
          topSectionStyle={topSectionStyle}
        />
      }
      isLeftFillSpace={false}
      isRightFillSpace={true}
    />
  );

  return layout;
}

export default MainLayout;
