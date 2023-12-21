import React, { useContext } from "react";
import {  MediaQueryContext, useComponentTheme } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

function MainLayout({
  header,
  menu,
  content,
  topSectionStyle,
  leftSectionStyle,
  rightSectionStyle,
  isRightFillSpace = true,
  bottomSection
}) {
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
          bottomSection={bottomSection}
          isBottomFillSpace={true}
          topSectionStyle={topSectionStyle}
          bottomSectionStyle={{position:"absolute", bottom: 0, left: 0, right: 0}}
        />
      }
      leftSectionStyle={leftSectionStyle}
      rightSectionStyle={rightSectionStyle}
      isLeftFillSpace={false}
      isRightFillSpace={isRightFillSpace}
    />
  );

  return layout;
}

export default MainLayout;
