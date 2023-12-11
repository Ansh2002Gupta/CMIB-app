import React from "react";
import BaseLayout from "../Base";
import layoutStyle from "./twoRow.style";

function TwoRow({
  style,
  topSection,
  bottomSection,
  topSectionStyle,
  bottomSectionStyle,
  isTopFillSpace,
  isBottomFillSpace,
  sideBar,
}) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }}>
      {({ Row }) => (
        <>
          {sideBar}
          <Row isFillSpace={isTopFillSpace} style={topSectionStyle}>
            {topSection}
          </Row>

          <Row isFillSpace={isBottomFillSpace} style={bottomSectionStyle}>
            {bottomSection}
          </Row>
        </>
      )}
    </BaseLayout>
  );
}

TwoRow.defaultProps = {
  style: {},
  topSectionStyle: {},
  isBottomFillSpace: false,
  isTopFillSpace: false,
  bottomSectionStyle: {},
  sideBar: {},
};

export default TwoRow;
