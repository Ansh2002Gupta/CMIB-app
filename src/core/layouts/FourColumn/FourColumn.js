import React from "react";
import BaseLayout from "../Base";
import layoutStyle from "./fourColumn.style";

function FourColumn({
  style,
  leftSectionStyle,
  rightSectionStyle,
  isLeftFillSpace,
  isRightFillSpace,
  firstSection,
  secoundSection,
  thirdSection,
  fourthSection,
}) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }}>
      {({ Row, Column }) => (
        <>
          <Column isFillSpace={isLeftFillSpace} style={leftSectionStyle}>
            {firstSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={rightSectionStyle}>
            {secoundSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={rightSectionStyle}>
            {thirdSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={rightSectionStyle}>
            {fourthSection}
          </Column>
        </>
      )}
    </BaseLayout>
  );
}

FourColumn.defaultProps = {
  style: {},
  leftSectionStyle: {},
  rightSectionStyle: {},
  isLeftFillSpace: false,
  isRightFillSpace: false,
};

export default FourColumn;
