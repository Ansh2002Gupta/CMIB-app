import React from "react";
import PropTypes from "prop-types";

import BaseLayout from "../Base";

import layoutStyle from "./FiveColumn.style";

function FiveColumn({
  firstSection,
  firstSectionStyle,
  fourthSection,
  fiveSection,
  fourthSectionStyle,
  fiveSectionStyle,
  isLeftFillSpace,
  isRightFillSpace,
  style,
  secoundSection,
  secoundSectionStyle,
  thirdSection,
  thirdSectionStyle,
 
}) {
  return (
    <BaseLayout style={{ ...layoutStyle, ...style }}>
      {({ Column }) => (
        <>
          <Column isFillSpace={isLeftFillSpace} style={firstSectionStyle}>
            {firstSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={secoundSectionStyle}>
            {secoundSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={thirdSectionStyle}>
            {thirdSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={fourthSectionStyle}>
            {fourthSection}
          </Column>
          <Column isFillSpace={isRightFillSpace} style={fiveSectionStyle}>
            {fiveSection}
          </Column>
        </>
      )}
    </BaseLayout>
  );
}

FiveColumn.defaultProps = {
  style: {},
  isLeftFillSpace: false,
  isRightFillSpace: false,
  firstSectionStyle: {},
  secoundSectionStyle: {},
  thirdSectionStyle: {},
  fourthSectionStyle: {},
  fiveSectionStyle: {},
};

FiveColumn.propTypes = {
  style: PropTypes.object,
  firstSectionStyle: PropTypes.object,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
  firstSection: PropTypes.node,
  secoundSection: PropTypes.node,
  thirdSection: PropTypes.node,
  fourthSection: PropTypes.node,
  fiveSection: PropTypes.node,
  secoundSectionStyle: PropTypes.object,
  thirdSectionStyle: PropTypes.object,
  fourthSectionStyle: PropTypes.object,
  fiveSectionStyle: PropTypes.object,
};

export default FiveColumn;
