import React from "react";
import BaseLayout from "../Base";
import PropTypes from "prop-types";
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
      {({ Column }) => (
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

FourColumn.propTypes = {
  style: PropTypes.object,
  leftSectionStyle: PropTypes.object,
  rightSectionStyle: PropTypes.object,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
  firstSection: PropTypes.node,
  secoundSection: PropTypes.node,
  thirdSection: PropTypes.node,
  fourthSection: PropTypes.node,
};

export default FourColumn;
