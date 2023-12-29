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
  footer,
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
          isBottomFillSpace
          topSectionStyle={topSectionStyle}
        />
      }
      bottomSection={bottomSection}
      isTopFillSpace
      isBottomFillSpace={false}
    />
  );

  if (isMdOrGreater)
    layout = (
      <TwoRow
        style={theme.mainContainerStyle}
        isTopFillSpace
        topSection={
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
            leftSectionStyle={!!menu && leftSectionStyle}
            rightSectionStyle={rightSectionStyle}
            isLeftFillSpace={isLeftFillSpace}
            isRightFillSpace={isRightFillSpace}
          />
        }
        bottomSection={footer}
      />
    );

  return layout;
}

export default MainLayout;
