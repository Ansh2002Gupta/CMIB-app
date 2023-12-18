import React from "react";
import {  useComponentTheme } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

function MainLayout({
  header,
  menu,
  content,
  topSectionStyle,
  leftSectionStyle,
  rightSectionStyle,
  isRightFillSpace = true,
}) {
  const theme = useComponentTheme("Auth");

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
      leftSectionStyle={leftSectionStyle}
      rightSectionStyle={rightSectionStyle}
      isLeftFillSpace={false}
      isRightFillSpace={isRightFillSpace}
    />
  );

  return layout;
}

export default MainLayout;
