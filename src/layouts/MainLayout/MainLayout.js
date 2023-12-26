import React from "react";
import { useComponentTheme } from "@unthinkable/react-theme";

import { TwoRow } from "../../core/layouts";

function MainLayout({
  header,
  menu,
  content,
  topSectionStyle,
  bottomSectionStyle,
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
          bottomSectionStyle={bottomSectionStyle}
        />
      }
      bottomSection={menu}
      isTopFillSpace={true}
      isBottomFillSpace={false}
    />
  );
  return layout;
}

export default MainLayout;
