import React from "react";
import BaseLayout from "../Base";
import layoutStyle from "./threeRow.style";

function ThreeRow({
  style,
  topSectionStyle,
  middleSectionStyle,
  bottomSectionStyle,
  topSection,
  isTopFillSpace,
  isMiddleFillSpace,
  isBottomFillSpace,
  middleSection,
  bottomSection,
}) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }}>
      {({ Row }) => (
        <>
          <Row isFillSpace={isTopFillSpace} style={topSectionStyle}>
            {topSection}
          </Row>
          <Row isFillSpace={isMiddleFillSpace} style={middleSectionStyle}>
            {middleSection}
          </Row>
          <Row isFillSpace={isBottomFillSpace} style={bottomSectionStyle}>
            {bottomSection}
          </Row>
        </>
      )}
    </BaseLayout>
  );
}

ThreeRow.defaultProps = {
  style: {},
  topSectionStyle: {},
  middleSectionStyle: {},
  bottomSectionStyle: {},
};

export default ThreeRow;
