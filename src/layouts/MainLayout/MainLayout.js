import React from "react";
import { useComponentTheme } from "@unthinkable/react-theme";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import { TwoColumn, TwoRow } from "../../core/layouts";


function MainLayout({
  header,
  menu,
  content,
  contentStyle,
  topSectionStyle,
  leftSectionStyle,
  rightSectionStyle,
  isRightFillSpace = true,
  isLeftFillSpace = false,
  bottomSection,
  bottomSectionStyle,
}) {
  const theme = useComponentTheme("Auth");
  const windowDimensions = useWindowDimensions();
  const isMdOrGreater = windowDimensions.width >= 900;

  let layout = (
    <TwoRow
      style={theme.mainContainerStyle}
      topSection={
        <TwoRow
          topSection={header}
          bottomSection={content}
          bottomSectionStyle={contentStyle}
          isBottomFillSpace={true}
          topSectionStyle={topSectionStyle}
        />
      }
      bottomSection={bottomSection}
      isTopFillSpace={true}
      isBottomFillSpace={false}
    />
  );

  // Changes made in MainLayout according to the SideBar

  // if(currentBreakpoint === 'md')
  // layout = (
  //   <TwoColumn
  //     style={theme.mainContainerStyle}
  //     leftSection={menu}
  //     rightSection={
  //       <TwoRow
  //         topSection={header}
  //         bottomSection={bottomSection}
  //         isBottomFillSpace={true}
  //         topSectionStyle={topSectionStyle}
  //         bottomSectionStyle={bottomSectionStyle}
  //       />
  //     }
  //     leftSectionStyle={leftSectionStyle}
  //     rightSectionStyle={rightSectionStyle}
  //     isLeftFillSpace={false}
  //     isRightFillSpace={isRightFillSpace}
  //   />

    if( isMdOrGreater)
    layout = (
      <TwoColumn
        style={theme.mainContainerStyle}
        leftSection={menu}
        rightSection={
          <TwoRow
            topSection={header}
            bottomSection={content}
            isBottomFillSpace={false}
            topSectionStyle={topSectionStyle}
            bottomSectionStyle={bottomSectionStyle}
          />
        }
        leftSectionStyle={leftSectionStyle}
        rightSectionStyle={rightSectionStyle}
        isLeftFillSpace={isLeftFillSpace}
        isRightFillSpace={isRightFillSpace}
      />
  );

  return layout;
}

export default MainLayout;
