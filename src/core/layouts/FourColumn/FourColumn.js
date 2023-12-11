import React from "react";
import BaseLayout from "../Base";
import PropTypes from "prop-types";

import layoutStyle from "./fourColumn.style";
function FourColumn({
  style,
  sectionStyle,
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
          <Column isFillSpace={isLeftFillSpace} style={sectionStyle}>
            {firstSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={sectionStyle}>
            {secoundSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={sectionStyle}>
            {thirdSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={sectionStyle}>
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
  sectionStyle: PropTypes.object,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
  firstSection: PropTypes.node,
  secoundSection: PropTypes.node,
  thirdSection: PropTypes.node,
  fourthSection: PropTypes.node,
};

export default FourColumn;
